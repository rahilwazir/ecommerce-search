eCommerce Faceted Search
========================

AngularJS based eCommerce faceted search front-end for SearchBlox

- Download the plugin folder into the SearchBlox installation under /searchblox to use the package. 
- Rename the existing the /plugin folder if available.
- Access the angularJS based search page at http://localhost:8080/searchblox/plugin/index.html
- Edit the /plugin/data/facet.json file to add/modify/remove term, number range and date range filters.
- Add sorting options and faceted search options on the facet.json file. 
- The sample data for indexing the items can be found within the /data/test_shoptiques.csv file.
- Please create a CSV collection and specify the path to the sample data file and setup each column within the CSV collection settings in the same order as provided in the csv sample data file including the image column.
- The columns need to be specificied in the following order for this example to work:
  - title, retail, color, size, sale, fabric, fit, length, neck, image, url
- These fields once indexed can be referenced as source.title or source.color etc.

To add a new facet filter like price or color please add the following entries into the csv.json file under /searchblox/WEB-INF folder in the following way. Please create the entries prior to creating the CSV collection.

            "source.color":{
                "type":"string",
                "store":"yes",
                "index":"analyzed",
                "analyzer":"comma_analyzer",
                "include_in_all":"false",
                "boost":"1"
            },
            "source.retail":{
                "type":"double",
                "store":"yes",
                "index":"not_analyzed",
                "include_in_all":"false"
            },
