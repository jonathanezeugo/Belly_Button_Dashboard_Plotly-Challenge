# Plotly-Challenge

Belly Button Biodiversity - Building a Dashboard

This challenge involves building an interactive dashboard to explore the Belly Button Biodiversity dataset provided in JavaScript Object Notation (JSON) format, which catalogs the microbes that colonize human navels.
The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare. Click [here](https://jonathanezeugo.github.io/Plotly-Challenge/StarterCode/index.html) to view the rendered page.

Step 1: Plotly
The D3 library was used to read the samples.json file and outputed to console to have a first hand view of the dataset.
Bar Chart:
A bar chart with a dropdown menu was constructed in the code format to display the top 10 OTUs found in each selected individual. To achieve this sample_values data from the samples.json dataset was used as values for the bar chart.
Also, the otu_ids data array was used to populate the labels for the bar chart, while the otu_labels data array was used for the hovertext chart information.
Bubble Chart:
A bubble chart was displayed on the dashboard to represent the selected OTU id, the bubble size represented the data point magnitude and associated colors obtained from the otu_ids data array. 
Step 2: (Optional)