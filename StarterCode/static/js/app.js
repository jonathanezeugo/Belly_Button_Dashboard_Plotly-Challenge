// Reading samples.json file with D3 library (Promise)
const dataSource = d3.json("../../../data/samples.json");

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
            //yaxis: {title: 'OTU ID Information'},
            title: `Top 10 (OTUs) for Test Subject ID No: ${chosenSample}`, font: {size: 12},
            width: 400,
            height: 650,
        }
        // Plot bar chart
        Plotly.newPlot('bar', barTrace, barLayout);

        // Build bubble chart
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
        // Plot bubble chart
        Plotly.newPlot('bubble', bublTrace, bublLayout);
    });
}

// Creating initializing function 
function init(){
    dataSource.then(nameOptions => {
        nameOptions.names.forEach(nameOption => {
            d3.select('#selDataset')
                .append('option')
                .text(nameOption)
                .property('value', nameOption);   
        });

        makeChart(nameOptions.names[0]);
        makeDemoInfo(nameOptions.names[0]);
        optionChanged(nameOptions.names[0]) 
    });
}

// Creating a function for the dropdown options
function makeDemoInfo(chosenSample){
    dataSource.then(sampMetaData => {
        let metaDataInfo = sampMetaData.metadata.filter(sampleObj => sampleObj.id.toString() === chosenSample)[0];

        let sampleMetadataPanel = d3.select('#sample-metadata');//.html("");

        // resetting
        sampleMetadataPanel.html("");
        Object.entries(metaDataInfo).forEach(([key, value]) => {
            sampleMetadataPanel
            .append('p').text(`${key}: ${value}`);            
        });
    });
}

// Creating a function to handle options change
function optionChanged(sample){
    makeChart(sample);
    makeDemoInfo(sample);
    
}

// Initializing function
init();