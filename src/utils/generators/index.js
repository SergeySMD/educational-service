const initConvert = {
  from: {
    value: {
      min: 64,
      max: 9999,
      current: null,
    },
    radix: {
      min: 2,
      max: 16,
      current: null,
      fromList: true,
      list: [2,8,10,16]
    },
  },
  to: {
    radix: {
      min: 2,
      max: 16,
      current: null,
      fromList: true,
      list: [2,8,10,16]
    },
  },
} 
export const useConvertNumberSystems = ({
  from = initConvert.from,
  to = initConvert.to
}) => {
  const {
    value: startValue,
    radix: startRadix,
  } = from;
  const {
    radix: endRadix,
  } = to;

  /* Получение числа и СС, с которой необходимо переводить.
      value - установленное или рандом между указанных min - max 
      radix - установленное или рандом из данного мвссива или рандом между указанных min - max
      converted: Конвертированное в нужную СС значение 
  */
  // const start = {
  //   value: startValue.current || randomInt(startValue.min, startValue.max),
  //   radix: startRadix.current || (startRadix.fromList ? randomArrayItem(startRadix.list) : randomInt(startRadix.min, startRadix.max))
  // }
  // start.converted = convertBase(start.value,start.radix,start.radix) 
  return [from, to]
}

const convertBase = (val, base1, base2) => {
  if (typeof(val) == "number") {
      return parseInt(String(val)).toString(base2);
  } else {
      return parseInt(val.toString(), base1).toString(base2)
  };
}
const randomInt = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
const randomArrayItem = (array) => {
  return array?.[Math.floor(Math.random()*array.length)];
}