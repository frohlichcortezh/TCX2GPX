import fs from 'fs';
import xmldom from 'xmldom';
import sportsLibPkg from '@sports-alliance/sports-lib';
import exporterPkg from '@sports-alliance/sports-lib/lib/events/adapters/exporters/exporter.gpx.js';

const { SportsLib } = sportsLibPkg;
const { EventExporterGPX } = exporterPkg;
const { DOMParser } = xmldom;

// Input and output file path
const inputFilePath = './assets/TCX/';
const outputGpxFilePath = './assets/GPX/';

var files = fs.readdirSync(inputFilePath);
let domParser = new DOMParser();

files.forEach(file => {
    console.log("Importing file " + file);

    // reads the TCX file into memory
    const inputFile = fs.readFileSync(inputFilePath+file, null);
    if (!inputFile || !inputFile.buffer) {
        console.error('Ooops, could not read the inputFile or it does not exists, see details below');
        console.error(JSON.stringify(inputFilePath));
        return;
    }
    
    console.log("Converting to TCX: "  + file);
    // uses lib to read the TCX file
    SportsLib.importFromTCX(domParser.parseFromString(inputFile.toString(), 'application/xml')).then((event)=>{
        
        // convert to gpx
        const gpxPromise = new EventExporterGPX().getAsString(event);
        gpxPromise.then((gpxString) => {
            // writes the gpx to file
            fs.writeFileSync(outputGpxFilePath + file.replace(".tcx", "") + ".GPX", gpxString, (wError) => {
                if (wError) {
                    console.error('Ooops, something went wrong while saving the GPX file, see details below.');
                    console.error(JSON.stringify(wError));
                }
            });
            // all done, celebrate!
            console.log('Converted TCX file to GPX successfully saved here: ' + outputGpxFilePath + file.replace(".tcx", "") + ".GPX");
        }).catch((cError) => {
            console.error('Ooops, something went wrong while converting the TCX file, see details below');
            console.error(JSON.stringify(cError));
        });
    });
    
});

