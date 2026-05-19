<script>
  import { categories, foods } from '../data/foods.js'
  import FoodCard from './FoodCard.svelte'
  import { fade } from 'svelte/transition'

  let { liked, disliked, onchange } = $props()

  function getState(id) {
    if (liked.has(id)) return 'liked'
    if (disliked.has(id)) return 'disliked'
    return 'none'
  }

  function handleChange(id, state) {
    onchange?.(id, state)
  }
</script>

<div class="space-y-6">
  {#each categories as cat}
    <section id="cat-{cat.id}" class="scroll-mt-4">
      <h2 class="flex items-center gap-2 text-base font-semibold text-neutral-700 mb-3 sticky top-0 bg-neutral-50/90 backdrop-blur-sm py-2 z-10">
        <span class="text-lg">{cat.emoji}</span>
        <span>{cat.name}</span>
        <span class="text-xs font-normal text-neutral-400 ml-auto tabular-nums">
          {foods.filter(f => f.category === cat.id).filter(f => liked.has(f.id)).length}
          /
          {foods.filter(f => f.category === cat.id).length}
        </span>
      </h2>
      <div class="flex flex-wrap gap-2.5" transition:fade={{ duration: 300 }}>
        {#each foods.filter(f => f.category === cat.id) as food (food.id)}
          <FoodCard {food} state={getState(food.id)} onchange={handleChange} />
        {/each}
      </div>
    </section>
  {/each}
</div>
