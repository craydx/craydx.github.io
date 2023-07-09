
// Open the json file and get the metadata and open and empty array to accept data. Append the h6 part of the html
function buildMetadata(sample){
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data)=>{
        let metadata = data.metadata;
        let resultArray = metadata.filter(sampleObj=>sampleObj.id==sample);
        let result = resultArray[0];
        let mdata = d3.select("#sample-metadata");
        mdata.html("");
        for (key in result){
            mdata.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
          };
    });

}
//Creat a funciton that reads the data from the Json list and set up the plot
function init(){

    let dropdown = d3.select("#selDataset");

    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data)=>{
    console.log(data);
    let ids = data.names;
    for  (let i=0;i<ids.length;i++){
        dropdown.append("option").text(ids[i]).property("value", ids[i]); 
    };     
    let firstSample = ids[0];
    plotthedata(firstSample)
    buildMetadata(firstSample);    
});
}
function optionChanged (newSample){
    console.log(newSample);
    buildMetadata(newSample);
    plotthedata(newSample)
};

init();
//Set up the bar plot with new data each time the item is selected, slice the data for the first 10 items and reverse the order. Start the barchart layout
function plotthedata (sampledata){ 
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data)=>{
    var samples =data.samples;
    var resultArray = samples.filter(sampleObject =>sampleObject.id==sampledata);
    var result = resultArray[0];
    var otuID=result.otu_ids;
    var otuLabel = result.otu_labels;
    
    var sampleValue = result.sample_values;
    var ylabels = otuID.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();

    var barchart ={
        x: sampleValue.slice(0,10).reverse(),
        y: ylabels,
        text: otuLabel.slice(0,10).reverse(),
        type:"bar",
        orientation:"h"
    };
    var barchartlayout ={

        title: "Top 10 Bacteria Cultures Found",
    
        margin: {
            l:100,
            r:40,
            b:40,
            t:70,
        },
    }
 
//Show the barchart
Plotly.newPlot("bar", [barchart], barchartlayout);

//Set up the bubble Chart
var bubbleChartData = {
    x: result.otu_ids,
    y: result.sample_values,
    mode:"markers",
    text: result.otu_labels,
    marker:{
        color: result.otu_ids,
        size: result.sample_values,
        colorscale: "Earth"
    }
} 

var bubbleChartLayout ={
    title: "Bacteria Cultures Found",
    xaxis: {title: "OTU ID"}
};
//Show bubble chart
Plotly.newPlot("bubble", [bubbleChartData], bubbleChartLayout);
})};


