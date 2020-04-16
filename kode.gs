function doPost(e) {
  var ss = SpreadsheetApp.openById("1bIpeKYJHjKOgI2cOY5gIzh-UaujmPg-hpp707Hs6NsI");
  var sheetName = e.parameter.sheetName;
  var sheet = ss.getSheetByName(sheetName);
  
  var action = e.parameter.action;
  
  switch (action){
    case "login":
      return login(e, sheet);
    case "register":
      return register(e, sheet);
     case "delete_akun" :
      return deleteAkun(e, sheet);
      break;
    case "update_profil" :
      return updateProfil(e, sheet);
      break;
   
      
  }
}

function login(request, sheet){
  var nipp = request.parameter.nipp;
  var password = request.parameter.password;
  var flag = 0;
  
  for (var row=2; row<=sheet.getLastRow();row++){
    var nippServer = sheet.getRange(row, 2).getValue();
    var passServer = sheet.getRange(row, 6).getValue();
    
    if (nipp == nippServer && password == passServer){
      flag = 1;
      
    }
  }
  
  if (flag == 0){
    var hasil = "gagal";
  }else{
    var hasil = "sukses";
  }
    
  var output = JSON.stringify(
    {
      "hasil" : hasil
    }
  );
  
  return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JSON);
}

function register(request, sheet){
  var nipp = request.parameter.nipp;
  var nama = request.parameter.nama;
  var hp = request.parameter.hp;
  var email = request.parameter.email;
  var password = request.parameter.password;
  var cpassword = request.parameter.cpassword;
  var flag = 0;
  
  
    if (password == cpassword ){
      flag = 1;
      sheet.appendRow([sheet.getLastRow(),nipp,nama,hp,email,password]);
    }
  
  
  
  if (flag == 0){
    var hasil = "gagal";
  }else{
    var hasil = "sukses";
  }
    
  var output = JSON.stringify(
    {
      "hasil" : hasil
    }
  );
  
  return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JSON);
}

function updateProfil(request, sheet){
  var id = request.parameter.noRegis;
  var nipp = request.parameter.nipp;
  var nama = request.parameter.nama;
  var hp = request.parameter.hp;
  var email = request.parameter.email;
  var password = request.parameter.password;
  
  var flag = 0;
  
  for (var row = 2; row<=sheet.getLastRow();row++){
  var idserver = sheet.getRange(row, 1).getValue();
    
    if (idserver == id) {
      sheet.getRange(row, 3).setValue(nama);
      sheet.getRange(row, 4).setValue(hp);
      sheet.getRange(row, 5).setValue(email);
      flag = 1;
    }
   
    if (flag == 0) {
      var hasil = "gagal";
    }else{
      var hasil = "sukses";
    }
  }
      
  var output = JSON.stringify({
    "hasil" : "Sukses"
  });
  
  return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JSON);
}

function deleteAkun(request, sheet){
  var id = request.parameter.noRegis;
  
  var flag = 0;
  
  for (var row = 2; row<=sheet.getLastRow();row++){
  var idserver = sheet.getRange(row, 1).getValue();
    
    if (idserver == id) {
      sheet.deleteRow(row)
      flag = 1;
    }
   
    if (flag == 0) {
      var hasil = "gagal";
    }else{
      var hasil = "sukses";
    }
  }
      
  var output = JSON.stringify({
    "hasil" : "Sukses"
  });
  
  return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JSON);
}