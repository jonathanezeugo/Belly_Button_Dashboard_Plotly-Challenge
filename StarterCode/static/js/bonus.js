// Reading samples.json file with D3 library (Promise)
const dataSource = d3.json('./../data/samples.json');
// Viewing json file in console
dataSource.then(dataset => {console.log(dataset)});

// Creating multiple functions for horizontal bar chart with dropdown for top 10 OTUs per individual
function makeChart(chosenSample){
    dataSource.then(data => {
        let sampleArr = data.samples.filter(sampleObj => sampleObj.id === chosenSample)[0];
        
        // Horizontal bar chart trace for top 10 OTUs
        let barTrace = [{
            x: sampleArr.sample_values.slice(0, 10).reverse(),
            y: sampleArr.otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse(),
            text: sampleArr.otu_labels.slice(0, 10).reverse(),
            type: 'bar',
            orientation: 'h',
            marker: {color:'blue', line: {color: 'cyan', width: 1.5}}
        }]
        let barLayout = {
            xaxis: {title: 'Sample Value'},
            yaxis: {title: 'OTU ID Information'},
            title: `Top 10 Operational Taxonomic Units (OTUs) for Test Subject ID No: ${chosenSample}`,
            width: 600,
            height: 450,
        }
        Plotly.newPlot('bar', barTrace, barLayout);

        let bublTrace = [{
            x: sampleArr.otu_ids,
            y: sampleArr.sample_values,
            text: sampleArr.otu_labels,
            type: 'scatter',
            mode: 'markers',
            marker: {size: sampleArr.sample_values, color: sampleArr.otu_ids}
        }];
        
        let bublLayout = {
            xaxis: {title: 'OTU ID'},
            yaxis: {title: 'Sample Value'},
            title: `Belly-button biodiversity information for Test Subject No: ${chosenSample}`,
            hovermode: 'closest',
            height: 600,
            width: 1000
        }
        Plotly.newPlot('bubble', bublTrace, bublLayout);


        // Dial Gauge
        dataSource.then(objMetaData => {
            let metaDataInfo = objMetaData.metadata.filter(sampleObj => sampleObj.id.toString() === chosenSample)[0];
                dialValue = metaDataInfo.wfreq;
        let dialTrace = [{
            domain: { x: [0, 1], y:[0, 1]},
            value: dialValue,
            type: 'indicator',
            mode: 'gauge+number',
            gauge: { bar: { color: 'magenta'}, axis: {range: [null, 9]}, 
                steps: [
                    { range: [0,1], color: '#f7fafa'},
                    { range: [1,2], color: '#edf7f7'},
                    { range: [2,3], color: '#acf2ef'},
                    { range: [3,4], color: '#9be8e4'},
                    { range: [4,5], color: '#79d1cd'},
                    { range: [5,6], color: '#5bb5b1'},
                    { range: [6,7], color: '#46a39f'},
                    { range: [7,8], color: '#38948f'},
                    { range: [8,9], color: '#28807b'}
                ],
            },
            title: {text: 'Belly Button Wash Frequency'}
        }];

        let dialLayout = {
            height: 350,
            width: 400,
            margin: {t: 170, b: 0}
        };

        Plotly.newPlot('gauge', dialTrace, dialLayout)
    });
});
};

function init(){
    dataSource.then(nameOptions => {
        nameOptions.names.forEach(nameOption => {
            d3.select('#selDataset')
                .append('option')
                .text(nameOption)
                .property('value', nameOption);
        // makeChart(nameOptions.names[0]);
        // makeDemoInfo(nameOptions.names[0]);
        // makeChoice(nameOptions.names[0])        
        });

        makeChart(nameOptions.names[0]);
        makeDemoInfo(nameOptions.names[0]);
        makeChoice(nameOptions.names[0]) 
    });
};

function makeDemoInfo(chosenSample){
    dataSource.then(sampMetaData => {
        let metaDataInfo = sampMetaData.metadata.filter(sampleObj => sampleObj.id.toString() === chosenSample)[0];

        let sampleMetadataPanel = d3.select('#sample-metadata');//.html("");

        // resetting
        sampleMetadataPanel.html("");
        Object.entries(metaDataInfo).forEach(([key, value]) => {
            sampleMetadataPanel
            .append('p').text(`${key}: ${value}`);
            //.append('h3').text(`${key}: ${value}`);
        });
    });
};

function makeChoice(sample){
    makeChart(sample);
    makeDemoInfo(sample);
    
};

init()
;