const forms = document.forms.TwoForms;

//personal-form
//Name
const fName = forms.elements.fName;
fName.addEventListener('blur', (eo) => fNameBlur(false));
function fNameBlur(focusError) {
  const fNameValue = fName.value;
  const personalName = document.getElementById('nameY');
  let errors = 0;
  if ((!isNaN(fNameValue)) || (fNameValue.length > 40) || (fNameValue.length < 2)) {
    personalName.classList.add('active');
    errors++;
    if (focusError)
      fName.focus();
  }
  else personalName.classList.remove('active');
  return errors;
}

//email
const email = forms.elements.email;
email.addEventListener('blur', (eo) => emailBlur(false));
function emailBlur(focusError) {
  const emailValue = email.value;
  const personalEmail = document.getElementById('email');
  const emValid = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  let errors = 0;
  if (!(isEmailValid(emailValue))) {
    personalEmail.classList.add('active');
    errors++;
    if (focusError)
      email.focus();
  }
  else personalEmail.classList.remove('active');
  function isEmailValid(value) {
    return emValid.test(value);
  }
  return errors;
}

//phone
const phone = forms.elements.phone;
phone.addEventListener('blur', (eo) => phoneBlur(false));
function phoneBlur(focusError) {
  const phoneValue = phone.value;
  const personalPhone = document.getElementById('phone');
  const phoneValid = /^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/;
  let errors = 0;
  if (!(isPhoneValid(phoneValue))) {
    personalPhone.classList.add('active');
    errors++;
    if (focusError)
      phone.focus();
  }
  else personalPhone.classList.remove('active');
  function isPhoneValid(value) {
    return phoneValid.test(value);
  }
  return errors;
}


//business-form
//number
const numbers = forms.elements.number;
numbers.addEventListener('blur', (eo) => numbersBlur(false));
function numbersBlur(focusError) {
  const numbersValue = numbers.value;
  const businessNumber = document.getElementById('number');
  let errors = 0;
  if ((!numbersValue.indexOf('-')) || (numbersValue.length == '') || (numbersValue == 0)) {
    businessNumber.classList.add('active');
    errors++;
    if (focusError)
      numbers.focus();
  }
  else businessNumber.classList.remove('active');
  return errors;
}

//industry
const industry = forms.elements.industry;
industry.addEventListener('blur', (eo) => industryChange(false));
industry.addEventListener('change', (eo) => industryChange(false));
function industryChange(focusError) {
  const industryValue = industry.value;
  const businessIndustry = document.getElementById('industry');
  let errors = 0;
  if (industryValue == 0) {
    businessIndustry.classList.add('active');
    errors++;
    if (focusError)
      industry.focus();
  }
  else businessIndustry.classList.remove('active');
  return errors;
}

//privacy
const checkBox = forms.elements.checkbox;
checkBox.addEventListener('change', (eo) => checkedChange(false));
function checkedChange(focusError) {
  const privacy = document.getElementById('privacy');
  let errors = 0;
  if (checkBox.checked == false) {
    privacy.classList.add('active-checkBox');
    errors++;
    if (focusError)
      checkBox.focus();
  }
  else privacy.classList.remove('active-checkBox');
  return errors;
}

//submit
forms.addEventListener('submit', validateFirstF, false);

function validateFirstF(eo) {
  let errorsAll = 0;
  errorsAll += fNameBlur(!errorsAll);
  errorsAll += emailBlur(!errorsAll);
  errorsAll += phoneBlur(!errorsAll);
  errorsAll += numbersBlur(!errorsAll);
  errorsAll += industryChange(!errorsAll);
  errorsAll += checkedChange(!errorsAll);
  if (errorsAll) {
    eo.preventDefault();
  }
  if (!errorsAll) {
    const forms = document.forms.TwoForms;

    ajaxForm();

    let fNameClear = forms.elements.fName;
    fNameClear.value = '';

    let emailClear = forms.elements.email;
    emailClear.value = '';

    let phoneClear = forms.elements.phone;
    phoneClear.value = '';

    let numberClear = forms.elements.number;
    numberClear.value = '';

    let industryClear = forms.elements.industry;
    industryClear.value = '';

    document.getElementById('check').checked = false;

    const success = document.querySelector('.success')
    success.classList.add('hidden');
    setTimeout(timeAnim, 4000)
    function timeAnim() {
      success.classList.remove('hidden');
    }

    eo.preventDefault();
  }
}

function ajaxForm() {

  const ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
  var nameEr = 'ERMOLOVICH_T4';

  const fNameValue = fName.value;
  const emailValue = email.value;
  const phoneValue = phone.value;
  const numbersValue = numbers.value;
  const industryValue = industry.value;
  const privacyValue = document.getElementById('check').checked

  let password;
  let resultEr;

  password = Math.random();
  $.ajax({
    url: ajaxHandlerScript, type: 'POST', cache: false, dataType: 'json',
    data: { f: 'LOCKGET', n: nameEr, p: password },
    success: resultFunc, error: errorHandler
  }
  );

  function resultFunc(resultFull) {
    resultEr = [];
    resultEr = JSON.parse(resultFull.result)
    resultEr.push({
      name: fNameValue, email: emailValue,
      phone: phoneValue, numbers: numbersValue,
      industry: industryValue, privacy: privacyValue
    })
    $.ajax({
      url: ajaxHandlerScript, type: 'POST', cache: false, dataType: 'json',
      data: { f: 'UPDATE', n: nameEr, v: JSON.stringify(resultEr), p: password },
      success: update_resultReady, error: errorHandler
    }
    );
  }
  function update_resultReady(ready) {
    console.log(ready.result)
  }

  function errorHandler(jqXHR, statusStr, errorStr) {
    alert(statusStr + ' ' + errorStr);
  }
}