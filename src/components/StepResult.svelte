<script>
  import { getLiked, getDisliked } from '../lib/store.svelte.js'
  import { generatePlan } from '../lib/recipe.js'
  import DailyPlan from './DailyPlan.svelte'
  import { fade } from 'svelte/transition'

  let { onback } = $props()
  let liked = $derived(getLiked())
  let disliked = $derived(getDisliked())
  let planKey = $state(0)

  let days = $derived.by(() => {
    planKey
    liked.size
    disliked.size
    return generatePlan(liked, disliked)
  })

  let avgCal = $derived(Math.round(days.reduce((s, d) => s + d.totalCal, 0) / days.length))
  let avgProtein = $derived(Math.round(days.reduce((s, d) => s + d.totalProtein, 0) / days.length))

  function regenerate() { planKey++ }
</script>

<div transition:fade={{ duration: 300 }} class="max-w-3xl mx-auto px-4 py-6">
  <div class="flex items-center justify-between mb-6">
    <button onclick={onback} class="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-700 transition-colors" type="button">&#8592; 返回修改</button>
    <button onclick={regenerate} class="inline-flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 transition-colors" type="button">&#8635; 重新生成</button>
  </div>

  <header class="text-center mb-6">
    <h1 class="text-2xl font-bold text-neutral-800 mb-1">你的减重食谱</h1>
    <p class="text-sm text-neutral-500">日均 {avgCal} kcal · 蛋白质 {avgProtein}g</p>
  </header>

  <div class="space-y-4">
    {#each days as d (d.day + planKey)}
      <DailyPlan day={d.day} data={d} />
    {/each}
  </div>

  <div class="mt-8 rounded-2xl bg-emerald-50 border border-emerald-200 p-5">
    <h3 class="font-semibold text-emerald-800 text-sm mb-2">&#128161; 减重小贴士</h3>
    <ul class="text-xs text-emerald-700 space-y-1.5 leading-relaxed">
      <li>&#8226; 每餐先吃蔬菜和蛋白质，最后吃碳水，有助于控制血糖</li>
      <li>&#8226; 每天喝够 2L 水（包含茶和黑咖啡）</li>
      <li>&#8226; 食材可根据自己喜好替换同等热量的食物</li>
      <li>&#8226; 配合每周 3-4 次运动效果更佳</li>
      <li>&#8226; 如果感到饥饿，可以在两餐之间增加一份蔬菜或喝水</li>
    </ul>
  </div>

  <p class="text-center text-[10px] text-neutral-400 mt-6 pb-8">食谱基于你的食物偏好生成，仅供参考。如有特殊健康状况请咨询医生。</p>
</div>
