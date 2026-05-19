<script>
  import { slide } from 'svelte/transition'
  import MealItem from './MealItem.svelte'

  let { day, data } = $props()
  let expanded = $state(true)

  let proteinPct = $derived(data.totalCal > 0 ? Math.round(data.totalProtein * 4 / data.totalCal * 100) : 0)
  let carbPct = $derived(data.totalCal > 0 ? Math.round(data.meals.flatMap(m => m.foods).reduce((s, f) => s + f.carbs, 0) * 4 / data.totalCal * 100) : 0)
  let fatPct = $derived(data.totalCal > 0 ? Math.round(data.meals.flatMap(m => m.foods).reduce((s, f) => s + f.fat, 0) * 9 / data.totalCal * 100) : 0)
</script>

<div class="rounded-2xl bg-neutral-50 border border-neutral-200 overflow-hidden card-shadow">
  <button
    onclick={() => expanded = !expanded}
    class="w-full flex items-center justify-between px-5 py-3.5 cursor-pointer hover:bg-neutral-100/50 transition-colors"
    type="button"
  >
    <div class="flex items-center gap-3">
      <span class="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-sm font-bold">{day}</span>
      <div class="text-left">
        <span class="font-semibold text-neutral-800">第 {day} 天</span>
        <span class="text-xs text-neutral-400 ml-2 tabular-nums">{data.totalCal} kcal</span>
      </div>
    </div>
    <span class="text-neutral-400 transition-transform duration-200" class:rotate-180={expanded}>&#9660;</span>
  </button>

  {#if expanded}
    <div transition:slide={{ duration: 200 }} class="px-5 pb-4 space-y-2.5">
      <div class="flex gap-2 py-2">
        <div class="flex-1 h-2 rounded-full bg-amber-200 overflow-hidden" title="碳水">
          <div class="h-full bg-amber-400 rounded-full transition-all" style="width: {carbPct}%"></div>
        </div>
        <div class="flex-1 h-2 rounded-full bg-emerald-200 overflow-hidden" title="蛋白质">
          <div class="h-full bg-emerald-400 rounded-full transition-all" style="width: {proteinPct}%"></div>
        </div>
        <div class="flex-1 h-2 rounded-full bg-sky-200 overflow-hidden" title="脂肪">
          <div class="h-full bg-sky-400 rounded-full transition-all" style="width: {fatPct}%"></div>
        </div>
      </div>
      <div class="flex gap-3 text-[10px] text-neutral-500 justify-center">
        <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-amber-400"></span>碳水 {carbPct}%</span>
        <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-emerald-400"></span>蛋白质 {proteinPct}%</span>
        <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-sky-400"></span>脂肪 {fatPct}%</span>
      </div>

      {#each data.meals as meal}
        <MealItem {meal} />
      {/each}
    </div>
  {/if}
</div>
