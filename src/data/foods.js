export const categories = [
  { id: 'protein', name: '蛋白质', emoji: '🥩' },
  { id: 'vegetable', name: '蔬菜', emoji: '🥬' },
  { id: 'fruit', name: '水果', emoji: '🍎' },
  { id: 'carb', name: '碳水', emoji: '🍚' },
  { id: 'dairy', name: '乳制品', emoji: '🥛' },
  { id: 'fat', name: '健康脂肪', emoji: '🥑' },
  { id: 'beverage', name: '饮品', emoji: '☕' },
]

/** @type {Array<{id:string,name:string,emoji:string,category:string,calories:number,protein:number,carbs:number,fat:number,serving:string}>} */
export const foods = [
  // 蛋白质
  { id: 'chicken_breast', name: '鸡胸肉', emoji: '🍗', category: 'protein', calories: 165, protein: 31, carbs: 0, fat: 3.6, serving: '100g' },
  { id: 'salmon', name: '三文鱼', emoji: '🐟', category: 'protein', calories: 208, protein: 20, carbs: 0, fat: 13, serving: '100g' },
  { id: 'egg', name: '鸡蛋', emoji: '🥚', category: 'protein', calories: 155, protein: 13, carbs: 1.1, fat: 11, serving: '2个' },
  { id: 'tofu', name: '嫩豆腐', emoji: '🫘', category: 'protein', calories: 76, protein: 8, carbs: 2, fat: 4, serving: '150g' },
  { id: 'shrimp', name: '虾仁', emoji: '🦐', category: 'protein', calories: 99, protein: 24, carbs: 0, fat: 0.3, serving: '100g' },
  { id: 'beef', name: '瘦牛肉', emoji: '🥩', category: 'protein', calories: 158, protein: 26, carbs: 0, fat: 5, serving: '100g' },
  { id: 'chicken_thigh', name: '鸡腿肉(去皮)', emoji: '🍗', category: 'protein', calories: 180, protein: 24, carbs: 0, fat: 8, serving: '100g' },
  { id: 'cod', name: '鳕鱼', emoji: '🐠', category: 'protein', calories: 82, protein: 18, carbs: 0, fat: 0.7, serving: '100g' },

  // 蔬菜
  { id: 'broccoli', name: '西兰花', emoji: '🥦', category: 'vegetable', calories: 34, protein: 2.8, carbs: 7, fat: 0.4, serving: '150g' },
  { id: 'spinach', name: '菠菜', emoji: '🥬', category: 'vegetable', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, serving: '100g' },
  { id: 'tomato', name: '番茄', emoji: '🍅', category: 'vegetable', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, serving: '1个(150g)' },
  { id: 'cucumber', name: '黄瓜', emoji: '🥒', category: 'vegetable', calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1, serving: '1根(150g)' },
  { id: 'bell_pepper', name: '彩椒', emoji: '🫑', category: 'vegetable', calories: 26, protein: 1, carbs: 6, fat: 0.3, serving: '100g' },
  { id: 'mushroom', name: '蘑菇', emoji: '🍄', category: 'vegetable', calories: 22, protein: 3.1, carbs: 3.3, fat: 0.3, serving: '100g' },
  { id: 'cabbage', name: '卷心菜', emoji: '🥬', category: 'vegetable', calories: 25, protein: 1.3, carbs: 5.8, fat: 0.1, serving: '150g' },
  { id: 'asparagus', name: '芦笋', emoji: '🌱', category: 'vegetable', calories: 20, protein: 2.2, carbs: 3.7, fat: 0.1, serving: '100g' },

  // 水果
  { id: 'apple', name: '苹果', emoji: '🍎', category: 'fruit', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, serving: '1个(180g)' },
  { id: 'blueberry', name: '蓝莓', emoji: '🫐', category: 'fruit', calories: 57, protein: 0.7, carbs: 14, fat: 0.3, serving: '100g' },
  { id: 'banana', name: '香蕉', emoji: '🍌', category: 'fruit', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, serving: '1根(120g)' },
  { id: 'strawberry', name: '草莓', emoji: '🍓', category: 'fruit', calories: 48, protein: 1, carbs: 11.7, fat: 0.3, serving: '150g' },
  { id: 'avocado', name: '牛油果', emoji: '🥑', category: 'fruit', calories: 160, protein: 2, carbs: 8.5, fat: 14.7, serving: '半个(75g)' },
  { id: 'orange', name: '橙子', emoji: '🍊', category: 'fruit', calories: 69, protein: 1.3, carbs: 17.6, fat: 0.2, serving: '1个(180g)' },

  // 碳水
  { id: 'brown_rice', name: '糙米', emoji: '🍚', category: 'carb', calories: 216, protein: 5, carbs: 45, fat: 1.8, serving: '150g(熟)' },
  { id: 'quinoa', name: '藜麦', emoji: '🍚', category: 'carb', calories: 222, protein: 8, carbs: 39, fat: 3.6, serving: '150g(熟)' },
  { id: 'sweet_potato', name: '红薯', emoji: '🍠', category: 'carb', calories: 134, protein: 2, carbs: 31, fat: 0.1, serving: '1个(180g)' },
  { id: 'oats', name: '燕麦', emoji: '🥣', category: 'carb', calories: 154, protein: 5.4, carbs: 27, fat: 2.6, serving: '40g' },
  { id: 'whole_wheat_bread', name: '全麦面包', emoji: '🍞', category: 'carb', calories: 92, protein: 3.4, carbs: 17, fat: 1.2, serving: '1片(35g)' },
  { id: 'buckwheat_noodle', name: '荞麦面', emoji: '🍜', category: 'carb', calories: 178, protein: 6, carbs: 35, fat: 1.2, serving: '150g(熟)' },

  // 乳制品
  { id: 'greek_yogurt', name: '希腊酸奶', emoji: '🥛', category: 'dairy', calories: 100, protein: 10, carbs: 5, fat: 5, serving: '100g' },
  { id: 'milk', name: '脱脂牛奶', emoji: '🥛', category: 'dairy', calories: 83, protein: 8, carbs: 12, fat: 0.2, serving: '250ml' },
  { id: 'cottage_cheese', name: '茅屋芝士', emoji: '🧀', category: 'dairy', calories: 98, protein: 11, carbs: 3, fat: 4.3, serving: '100g' },
  { id: 'cheese_slice', name: '低脂芝士片', emoji: '🧀', category: 'dairy', calories: 60, protein: 5, carbs: 1, fat: 4, serving: '1片(20g)' },

  // 健康脂肪
  { id: 'almond', name: '杏仁', emoji: '🥜', category: 'fat', calories: 165, protein: 6, carbs: 6, fat: 14, serving: '25g(约20颗)' },
  { id: 'walnut', name: '核桃', emoji: '🌰', category: 'fat', calories: 164, protein: 3.8, carbs: 3.4, fat: 16, serving: '25g(约4颗)' },
  { id: 'olive_oil', name: '橄榄油', emoji: '🫒', category: 'fat', calories: 119, protein: 0, carbs: 0, fat: 13.5, serving: '1汤匙(15ml)' },
  { id: 'chia_seed', name: '奇亚籽', emoji: '🫘', category: 'fat', calories: 130, protein: 4.3, carbs: 12, fat: 8.6, serving: '20g' },

  // 饮品
  { id: 'green_tea', name: '绿茶', emoji: '🍵', category: 'beverage', calories: 0, protein: 0, carbs: 0, fat: 0, serving: '250ml' },
  { id: 'black_coffee', name: '黑咖啡', emoji: '☕', category: 'beverage', calories: 0, protein: 0, carbs: 0, fat: 0, serving: '250ml' },
  { id: 'lemon_water', name: '柠檬水', emoji: '🍋', category: 'beverage', calories: 5, protein: 0, carbs: 2, fat: 0, serving: '250ml' },
  { id: 'soy_milk', name: '无糖豆浆', emoji: '🥤', category: 'beverage', calories: 33, protein: 2.9, carbs: 1.6, fat: 1.6, serving: '250ml' },
]

/** @param {string} id */
export function getFood(id) {
  return foods.find(f => f.id === id)
}
