//自定义表单规则  手机号码验证
export function checkPhone(rules, value, callback) {
    let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("手机号格式不正确!!"));
    }
  }
  //自定义表单规则  邮箱验证
  export function checkEmail(rules, value, callback){
    let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("邮箱格式不正确!!"));
    }
  }