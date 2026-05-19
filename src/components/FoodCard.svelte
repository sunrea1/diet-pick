<script>
  import { fly } from 'svelte/transition'

  let { food, state, onchange } = $props()

  const states = ['none', 'liked', 'disliked']
  const nextState = {
    none: 'liked',
    liked: 'disliked',
    disliked: 'none'
  }

  function cycle() {
    const next = nextState[state]
    onchange?.(food.id, next)
  }
</script>

<button
  onclick={cycle}
  class="relative flex flex-col items-center gap-1.5 rounded-xl border-2 px-4 py-3
    transition-all duration-200 ease-out select-none cursor-pointer
    min-w-[100px] min-h-[100px]
    {state === 'liked'
      ? 'border-emerald-400 bg-emerald-50 text-emerald-700 scale-[1.02] card-shadow-hover'
      : state === 'disliked'
        ? 'border-rose-300 bg-rose-50 text-rose-500 opacity-60'
        : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:card-shadow-hover'}
    active:scale-95"
  aria-label="{food.name}: {state === 'liked' ? '喜欢' : state === 'disliked' ? '不喜欢' : '未选择'}"
  type="button"
>
  <span class="text-2xl leading-none">{food.emoji}</span>
  <span class="text-xs font-medium leading-tight text-center">{food.name}</span>
  <span class="text-[10px] text-neutral-400 leading-none">{food.calories}kcal</span>

  {#if state === 'liked'}
    <span class="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400 text-white text-xs shadow-sm">
      &#10084;
    </span>
  {:else if state === 'disliked'}
    <span class="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-rose-300 text-white text-xs shadow-sm">
      &#10005;
    </span>
  {/if}
</button>
