function doPost(e){
  
  //fill your id
  var id = SpreadsheetApp.openById(''); 
  
  var timestamp = Utilities.formatDate(new Date(), "GMT+7", "MM/dd/yyyy HH:mm:ss");
  var nama = e.parameter.nama;
  var email = e.parameter.email; 
  var jenis_kelamin = e.parameter.jenis_kelamin;
  var alamat = e.parameter.alamat;
  
  id.appendRow([timestamp, nama,email, jenis_kelamin, alamat]);
  
  var jsonObject =
  {
    status: 'berhasil'  
  }
  
  var JSONString = JSON.stringify(jsonObject);
  var JSONOutput = ContentService.createTextOutput(JSONString);
  JSONOutput.setMimeType(ContentService.MimeType.JSON);
  return JSONOutput;
  
}