## Importing data

Open `data-exporter.xlsm` (located in `/csv`)

For `This workbook contains macros. Do you want to disable macros before opening the file?` -> choose `Enable Macros`

Then navigate to `File` -> `Import` -> `CSV File`

Select the exported file.csv (most likely in `exports/file.csv`)

Then in the Text Import Wizard window:

Step 1: For `Original data type`, keep the default (`Delimited`), then click `Next >`

Step 2: For the delimiters, Excel should save the previous setting (by default, it delimits by `Comma` and `Tab`). Keep these, and select `Next >`

Step 3: Click on `Finish`. You can select individual data formats for each column, but since these will be exported as CSVs, it will make more sense to already have formatted display data before importing them into your `.xlsm` file. 

For `Where do you want to put the data?`, just click OK.

You should now have a worksheet named `Sheet1` that has all of your exported data in it. 


## Exporting data

Navigate to `Tools` -> `Macro` -> `Macros…`

You should see two macros listed:

parse_data: will parse the data you imported into worksheet `Sheet1` and split them into their own worksheets. 
SplitWorkbook: will export each sheet into their own CSV files.

You'll need to adjust some parameters within the `parse_data` macro. To do this, click on `Edit`. 

Under the first comment, you`ll see
```
vcol=1
```
This parameter indicates which column to use to split out the data to each worksheet. For readability, however, it`s recommended to manually move the column you want to use to split the data to the first column. 

Then under the next comment, you`ll see
```
Set ws = Sheets("Sheet1")
```
Again, it`s recommended that you manually name the the leftmost (first) worksheet the same as the param name inside Sheets(), but you can also match the param inside the script to match your worksheet name. 

Lastly, you`ll need to adjust the range of columns to copy over in
```
Title = “A1:L1”
```
to the format `A1:<end_column>`. 

Once these are set, make sure that you have `Sheet1` in view, and then go to `Run` -> `Run Sub/UserForm`. This should split out new worksheets with the text from `vcol` as the worksheet names. 

It's recommended that you save the `parse_data` script as another script, such as `parse_data_stations`, etc, for the posterity of the original script.


## Exporting worksheets into individual CSV files

Close the `parse_data` (or modified parse_data script), and then open up the `SplitWorkbook` macro. This step does not require any extra modifications, so just run the script as is. This will export out your worksheets into the `/exports` folder. 
