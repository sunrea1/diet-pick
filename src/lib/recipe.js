import { foods, categories } from '../data/foods.js'

const TARGET_DAILY = 1500
const MEAL_TARGETS = {
  breakfast: { label: '早餐', cal: 350, proteinPct: 0.25, time: '07:00-08:00' },
  lunch: { label: '午餐', cal: 500, proteinPct: 0.35, time: '12:00-13:00' },
  dinner: { label: '晚餐', cal: 400, proteinPct: 0.40, time: '18:00-19:00' },
  snack: { label: '加餐', cal: 150, proteinPct: 0.15, time: '15:00-16:00' },
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickOne(pool, used, prefer = []) {
  const sorted = shuffle([...pool])
  const firstChoice = sorted.find(f => prefer.includes(f.id) && !used.has(f.id))
  if (firstChoice) { used.add(firstChoice.id); return firstChoice }
  const fallback = sorted.find(f => !used.has(f.id))
  if (fallback) { used.add(fallback.id); return fallback }
  const any = sorted[0]
  if (any) { used.add(any.id); return any }
  return null
}

function pickOneByCategory(pool, categoryId, used) {
  const candidates = pool.filter(f => f.category === categoryId)
  const shuffled = shuffle(candidates)
  const picked = shuffled.find(f => !used.has(f.id))
  if (picked) { used.add(picked.id); return picked }
  const fallback = shuffled[0]
  if (fallback) { used.add(fallback.id); return fallback }
  return null
}

function calcTotal(items) {
  return items.reduce((s, f) => s + f.calories, 0)
}

/**
 * @param {Set<string>} liked
 * @param {Set<string>} disliked
 * @returns {Array<{day:number,meals:Array<{type:string,label:string,cal:number,protein:number,foods:Array}>,totalCal:number,totalProtein:number}>}
 */
export function generatePlan(liked, disliked) {
  const likedPool = shuffle(foods.filter(f => liked.has(f.id)))
  const neutralPool = shuffle(foods.filter(f => !liked.has(f.id) && !disliked.has(f.id)))
  const pool = [...likedPool, ...neutralPool]
  const forbidden = new Set(disliked)
  const available = pool.filter(f => !forbidden.has(f.id))
  const usedGlobally = new Set()

  const days = []
  for (let d = 0; d < 3; d++) {
    const usedThisDay = new Set()
    const meals = []

    for (const [type, target] of Object.entries(MEAL_TARGETS)) {
      /** @type {Array} */
      let selected = []
      let cal = 0

      if (type === 'breakfast') {
        const carb = pickOneByCategory(available, 'carb', usedThisDay)
        const protein = pickOneByCategory(available, 'protein', usedThisDay) ?? pickOneByCategory(available, 'dairy', usedThisDay)
        if (carb) selected.push(carb)
        if (protein) selected.push(protein)
        if (selected.length < 2 && Math.random() > 0.5) {
          const fruit = pickOneByCategory(available, 'fruit', usedThisDay)
          if (fruit) selected.push(fruit)
        }
      } else if (type === 'lunch') {
        const protein = pickOneByCategory(available, 'protein', usedThisDay)
        const carb = pickOneByCategory(available, 'carb', usedThisDay)
        const veg = pickOneByCategory(available, 'vegetable', usedThisDay)
        const fat = pickOneByCategory(available, 'fat', usedThisDay)
        if (protein) selected.push(protein)
        if (carb) selected.push(carb)
        if (veg) selected.push(veg)
        if (fat) selected.push(fat)
      } else if (type === 'dinner') {
        const protein = pickOneByCategory(available, 'protein', usedThisDay)
        const veg1 = pickOneByCategory(available, 'vegetable', usedThisDay)
        const veg2 = pickOneByCategory(available, 'vegetable', usedThisDay)
        if (protein) selected.push(protein)
        if (veg1) selected.push(veg1)
        if (veg2 && veg2.id !== veg1?.id) selected.push(veg2)
        if (selected.length === 1) {
          const fat = pickOneByCategory(available, 'fat', usedThisDay)
          if (fat) selected.push(fat)
        }
      } else if (type === 'snack') {
        const fruit = pickOneByCategory(available, 'fruit', usedThisDay)
        const nut = pickOneByCategory(available, 'fat', usedThisDay)
        const dairy = pickOneByCategory(available, 'dairy', usedThisDay)
        const options = [fruit, nut, dairy].filter(Boolean)
        const picked = options.length > 0 ? [options[Math.floor(Math.random() * options.length)]] : []
        selected = picked
      }

      cal = calcTotal(selected)
      const protein = selected.reduce((s, f) => s + f.protein, 0)

      // Mark as globally used if more than 2 days left and food is not from liked pool
      selected.forEach(f => {
        if (!liked.has(f.id) && d < 2) {
          usedGlobally.add(f.id)
        }
      })

      meals.push({
        type,
        label: target.label,
        time: target.time,
        foods: selected.map(f => ({
          id: f.id,
          name: f.name,
          emoji: f.emoji,
          calories: f.calories,
          protein: f.protein,
          carbs: f.carbs,
          fat: f.fat,
          serving: f.serving,
        })),
        cal,
        protein,
      })
    }

    const totalCal = calcTotal(meals.flatMap(m => m.foods))
    const totalProtein = meals.reduce((s, m) => s + m.protein, 0)

    days.push({
      day: d + 1,
      meals,
      totalCal: Math.round(totalCal),
      totalProtein: Math.round(totalProtein),
    })
  }

  return days
}

export { MEAL_TARGETS }
