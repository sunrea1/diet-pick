<script>
  let { liked, disliked, total } = $props()
  let pct = $derived(total > 0 ? Math.round((liked + disliked) / total * 100) : 0)
</script>

<div class="w-full">
  <div class="flex items-center justify-between mb-1.5">
    <span class="text-xs font-medium text-neutral-500">选择进度</span>
    <span class="text-xs text-neutral-400 tabular-nums">
      <span class="text-emerald-500 font-medium">{liked}</span>
      <span class="text-rose-400 font-medium"> / {disliked}</span>
      <span> / {total}</span>
    </span>
  </div>
  <div class="h-2 rounded-full bg-neutral-200 overflow-hidden">
    <div
      class="h-full rounded-full transition-all duration-500 ease-out"
      style="width: {pct}%"
      class:bg-gradient-to-r={pct > 0}
      class:from-emerald-400={pct > 0}
      class:to-emerald-500={pct > 0}
      class:bg-neutral-200={pct === 0}
    ></div>
  </div>
  {#if pct === 100}
    <p class="text-[10px] text-emerald-500 mt-1 text-center">全部选完!</p>
  {:else if pct > 0}
    <p class="text-[10px] text-neutral-400 mt-1 text-center">再选 {total - liked - disliked} 个</p>
  {/if}
</div>
