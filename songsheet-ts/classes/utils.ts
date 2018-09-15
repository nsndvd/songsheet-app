export class Utils {
    /**
    * compare two integer
    * @param {number} a - first value
    * @param {number} b - second value
    * @return {boolean} a >= b
    * */
    static max(a, b){
       if(a >= b)
           return a;
       return b;
   }
}