' Set your settings
    strFileURL = "https://overpass-api.de/api/interpreter?data=[out:json];(%20area(3603501793);%20)-%3E.searchArea;%20(%20node[%22amenity%22~%22water_point|drinking%20water|drinking_water|drinking|water%22](area.searchArea);%20node[%22emergency%22~%22water_tank|water%20tank%22](area.searchArea);%20node[%22natural%22~%22creek|stream|spring|water%22](area.searchArea);%20);%20out%20meta;%20%3E;%20out%20skel%20qt;"
    strHDLocation = "\interpreter.json"

' Fetch the file
    Set objXMLHTTP = CreateObject("MSXML2.XMLHTTP")

    objXMLHTTP.open "GET", strFileURL, false
    objXMLHTTP.send()

If objXMLHTTP.Status = 200 Then
Set objADOStream = CreateObject("ADODB.Stream")
objADOStream.Open
objADOStream.Type = 1 'adTypeBinary

objADOStream.Write objXMLHTTP.ResponseBody
objADOStream.Position = 0    'Set the stream position to the start

Set objFSO = CreateObject("Scripting.FileSystemObject")
If objFSO.Fileexists(strHDLocation) Then objFSO.DeleteFile strHDLocation
Set objFSO = Nothing

objADOStream.SaveToFile strHDLocation
objADOStream.Close
Set objADOStream = Nothing
End if

Set objXMLHTTP = Nothing