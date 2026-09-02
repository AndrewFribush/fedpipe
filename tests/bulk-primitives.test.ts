import { describe, it, expect } from "vitest";
import { deflateRawSync } from "node:zlib";
import { csvRecords, unzipEntries } from "../src/shared/bulk.js";

describe("csvRecords", () => {
  const rows = (s: string) => [...csvRecords(s)];

  it("parses simple rows", () => {
    expect(rows("a,b,c\n1,2,3\n")).toEqual([["a", "b", "c"], ["1", "2", "3"]]);
  });

  it("handles quoted fields with embedded commas", () => {
    expect(rows('name,city\n"G.W. LISK COMPANY, INC.",CLIFTON SPRINGS\n')).toEqual([
      ["name", "city"],
      ["G.W. LISK COMPANY, INC.", "CLIFTON SPRINGS"],
    ]);
  });

  it("handles escaped quotes and embedded newlines", () => {
    expect(rows('a\n"he said ""hi""\nthen left",b\n')).toEqual([
      ["a"],
      ['he said "hi"\nthen left', "b"],
    ]);
  });

  it("preserves trailing empty fields and skips blank lines", () => {
    expect(rows("a,b,\n\n1,2,3")).toEqual([["a", "b", ""], ["1", "2", "3"]]);
  });

  it("handles CRLF and a final row without a trailing newline", () => {
    expect(rows("a,b\r\n1,2")).toEqual([["a", "b"], ["1", "2"]]);
  });
});

// Build a minimal ZIP (one or more stored/deflate entries) with a valid
// central directory + EOCD, to exercise unzipEntries without a fixture file.
function makeZip(files: { name: string; data: Buffer; deflate?: boolean }[]): Buffer {
  const locals: Buffer[] = [];
  const centrals: Buffer[] = [];
  let offset = 0;
  for (const f of files) {
    const name = Buffer.from(f.name, "utf8");
    const comp = f.deflate ? deflateRawSync(f.data) : f.data;
    const method = f.deflate ? 8 : 0;
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(method, 8);
    local.writeUInt32LE(comp.length, 18);
    local.writeUInt32LE(f.data.length, 22);
    local.writeUInt16LE(name.length, 26);
    locals.push(Buffer.concat([local, name, comp]));

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(method, 10);
    central.writeUInt32LE(comp.length, 20);
    central.writeUInt32LE(f.data.length, 24);
    central.writeUInt16LE(name.length, 28);
    central.writeUInt32LE(offset, 42);
    centrals.push(Buffer.concat([central, name]));
    offset += local.length + name.length + comp.length;
  }
  const cd = Buffer.concat(centrals);
  const localBlob = Buffer.concat(locals);
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(files.length, 8);
  eocd.writeUInt16LE(files.length, 10);
  eocd.writeUInt32LE(cd.length, 12);
  eocd.writeUInt32LE(localBlob.length, 16);
  return Buffer.concat([localBlob, cd, eocd]);
}

describe("unzipEntries", () => {
  it("extracts a deflated multi-entry archive and can select by name", () => {
    const zip = makeZip([
      { name: "MASTER.txt", data: Buffer.from("N,OWNER\n12345,ACME\n"), deflate: true },
      { name: "ACFTREF.txt", data: Buffer.from("CODE,MFR\n001,BOEING\n"), deflate: true },
      { name: "ardata.pdf", data: Buffer.from("%PDF"), deflate: false },
    ]);
    const all = unzipEntries(zip);
    expect(all.size).toBe(3);
    expect(all.get("MASTER.txt")!.toString()).toContain("ACME");

    const picked = unzipEntries(zip, ["ACFTREF.txt"]);
    expect(picked.size).toBe(1);
    expect(picked.get("ACFTREF.txt")!.toString()).toContain("BOEING");
  });

  it("handles a stored (uncompressed) entry", () => {
    const zip = makeZip([{ name: "x.csv", data: Buffer.from("a,b\n1,2\n"), deflate: false }]);
    expect(unzipEntries(zip).get("x.csv")!.toString()).toBe("a,b\n1,2\n");
  });
});
