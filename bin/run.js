#!/usr/bin/env node

const { execFileSync } = require("child_process");
const { join } = require("path");

function getBinaryPath() {
  const platform = process.platform; // darwin, linux, win32
  const arch = process.arch;         // arm64, x64

  const pkgName = `agenticjobs-${platform}-${arch}`;
  const binaryName = platform === "win32" ? "agenticjobs.exe" : "agenticjobs";

  try {
    const pkgJson = require.resolve(`${pkgName}/package.json`);
    return join(pkgJson, "..", "bin", binaryName);
  } catch {
    console.error(
      `agenticjobs: no binary found for ${platform}/${arch}\n` +
      `Try reinstalling: npm install agenticjobs`
    );
    process.exit(1);
  }
}

execFileSync(getBinaryPath(), process.argv.slice(2), { stdio: "inherit" });
