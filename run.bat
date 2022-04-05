@echo off
SET APIKEY=f03f0ec75eab34c62ae6edd8982289fe1183ff25f8709434c3b94f5116f3915e
SET FORMAT=csv

for %%f in (report-27100.xml) do (
    echo %%~nf
    %PATH_CURL%\curl -X POST -H "Content-Type: application/xml" --data @%%~nf.xml http://vs-pac-xml-4.main.oecd.org:10001/v1/report?apikey=%APIKEY%^&format=csv -o %%~nf.csv
)

pause