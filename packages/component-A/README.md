Flow is happy if .flow lives next to a js or json file.  Here we export src/index.ts, which babel is happy to transpile so it works functionally in RN.

That said flow isn't happy as because we don't export a .js file, it doesn't read a .js.flow file, despite us trying with both a index.js.flow and index.ts.flow file, no dice...


It would be nice if flow could read a .flow file from a .ts file, is this patchable?  May be issue b/c we use the .bin folder for a precombiled flow