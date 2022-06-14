export function first(list) {
    if (!Array.isArray(list))
        return undefined;
    const length = list.length;
    return length ? list[0] : undefined;
}
// function namespace() {
//   let arr = ["a", "b", "c", "d", "e"];
//   return arr.reduceRight(function(result, prev, index) {
//     const a =  JSON.parse(JSON.stringify((result)));
//     result = {};
//     result[prev] = a;
//     return result;
//   }, {});
// }
// const namespace = (str: string): object =>
//   str.split(".").reduceRight((acc, key) => ({ [key]: acc }), {});
//   namespace('a.b.c.d.e') // "{"a":{"b":{"c":{"d":{"e":{}}}}}}"
// Пространство имён
// Напишите функцию, которая создаёт пространство имён. На вход подаётся строка вида: a.b.c.d.e, на выходе — вложенные друг в друга объекты.
// Проверьте, что разделителем служит точка.
//# sourceMappingURL=first.js.map