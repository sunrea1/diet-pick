<script>
  let { meal } = $props()
</script>

<div class="rounded-xl bg-white border border-neutral-100 card-shadow p-3.5">
  <div class="flex items-center justify-between mb-2">
    <div class="flex items-center gap-2">
      <span class="text-xs font-medium text-neutral-400">{meal.time}</span>
      <span class="text-sm font-semibold text-neutral-700">{meal.label}</span>
    </div>
    <span class="text-xs font-medium tabular-nums">
      <span class="text-emerald-600">{meal.cal}</span>
      <span class="text-neutral-400"> kcal</span>
    </span>
  </div>

  <div class="flex flex-wrap gap-1.5">
    {#each meal.foods as food}
      <span class="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-600">
        <span>{food.emoji}</span>
        <span>{food.name}</span>
        <span class="text-neutral-400 ml-0.5">({food.serving})</span>
      </span>
    {/each}
  </div>

  <div class="flex gap-3 mt-2 pt-2 border-t border-neutral-100 text-[10px] text-neutral-400">
    {#if meal.foods.length > 0}
      <span>蛋白质 <span class="font-medium text-neutral-600">{meal.protein}g</span></span>
      <span>碳水 <span class="font-medium text-neutral-600">{Math.round(meal.foods.reduce((s, f) => s + f.carbs, 0))}g</span></span>
      <span>脂肪 <span class="font-medium text-neutral-600">{Math.round(meal.foods.reduce((s, f) => s + f.fat, 0))}g</span></span>
    {/if}
  </div>
</div>
