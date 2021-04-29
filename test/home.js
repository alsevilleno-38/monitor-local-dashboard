export let num = 1000;

export const changeNum = () => {
    num++;
    console.log(num)
}

export default {
    num, changeNum
}