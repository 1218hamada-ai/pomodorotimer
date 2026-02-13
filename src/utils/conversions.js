// 温度変換
export const convertTemperature = (value, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return value;

  let celsius;

  // 入力をセルシウスに変換
  if (fromUnit === '°C') {
    celsius = value;
    // 絶対零度以下のチェック
    if (celsius < -273.15) {
      throw new Error('温度が絶対零度（-273.15°C）より低くなっています');
    }
  } else if (fromUnit === '°F') {
    celsius = (value - 32) * (5 / 9);
    if (celsius < -273.15) {
      throw new Error('温度が絶対零度より低くなっています');
    }
  } else if (fromUnit === 'K') {
    if (value < 0) {
      throw new Error('ケルビン温度は0未満にはなりません');
    }
    celsius = value - 273.15;
  }

  // セルシウスから出力単位に変換
  if (toUnit === '°C') {
    return celsius;
  } else if (toUnit === '°F') {
    return celsius * (9 / 5) + 32;
  } else if (toUnit === 'K') {
    return celsius + 273.15;
  }
};

// 距離変換（メートルを基準）
export const convertDistance = (value, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return value;
  if (value < 0) {
    throw new Error('距離は負の値にはなりません');
  }

  const toMeters = {
    'm': 1,
    'km': 1000,
    'cm': 0.01,
    'mm': 0.001,
    'mi': 1609.34,
    'yd': 0.9144,
    'ft': 0.3048,
    'in': 0.0254
  };

  const meters = value * toMeters[fromUnit];
  return meters / toMeters[toUnit];
};

// 重さ変換（キログラムを基準）
export const convertWeight = (value, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return value;
  if (value < 0) {
    throw new Error('重さは負の値にはなりません');
  }

  const toKilograms = {
    'kg': 1,
    'g': 0.001,
    'mg': 0.000001,
    'lb': 0.453592,
    'oz': 0.0283495,
    't': 1000
  };

  const kilograms = value * toKilograms[fromUnit];
  return kilograms / toKilograms[toUnit];
};

// 体積変換（リットルを基準）
export const convertVolume = (value, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return value;
  if (value < 0) {
    throw new Error('体積は負の値にはなりません');
  }

  const toLiters = {
    'L': 1,
    'mL': 0.001,
    'cup': 0.236588,
    'gal': 3.78541,
    'fl oz': 0.0295735,
    'pint': 0.473176,
    'quart': 0.946353,
    'tbsp': 0.0147868,
    'tsp': 0.00492892
  };

  const liters = value * toLiters[fromUnit];
  return liters / toLiters[toUnit];
};

// エネルギー変換（ジュールを基準）
export const convertEnergy = (value, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return value;

  const toJoules = {
    'J': 1,
    'kJ': 1000,
    'kcal': 4184,
    'BTU': 1055.06
  };

  const joules = value * toJoules[fromUnit];
  return joules / toJoules[toUnit];
};

// 面積変換（平方メートルを基準）
export const convertArea = (value, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return value;
  if (value < 0) {
    throw new Error('面積は負の値にはなりません');
  }

  const toSquareMeters = {
    'm²': 1,
    'km²': 1000000,
    'cm²': 0.0001,
    'ha': 10000,
    'acre': 4046.86,
    'ft²': 0.092903,
    'yd²': 0.836127
  };

  const squareMeters = value * toSquareMeters[fromUnit];
  return squareMeters / toSquareMeters[toUnit];
};

// 速度変換（メートル毎秒を基準）
export const convertSpeed = (value, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return value;

  const toMPS = {
    'm/s': 1,
    'km/h': 0.277778,
    'mph': 0.44704,
    'knots': 0.51444
  };

  const mps = value * toMPS[fromUnit];
  return mps / toMPS[toUnit];
};

// 圧力変換（パスカルを基準）
export const convertPressure = (value, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return value;

  const toPascals = {
    'Pa': 1,
    'kPa': 1000,
    'atm': 101325,
    'bar': 100000,
    'psi': 6894.76
  };

  const pascals = value * toPascals[fromUnit];
  return pascals / toPascals[toUnit];
};
