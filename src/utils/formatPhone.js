 export function formatPhone(string){
    console.log(string);
    if(string != null)
        return string.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
    else
        return null;
}