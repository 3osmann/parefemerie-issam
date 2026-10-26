export type JournalArticle = {
  intro: string;
  takeaways: string[];
  sections: { heading: string; paragraphs: string[] }[];
  productSlug: string;
};

export const journalArticles: Record<string, JournalArticle> = {
  "metabolism-after-30": {
    intro:
      "If you are in your thirties and feel like the rules changed overnight, you are not imagining it. But the answer is not punishing cardio at 5am — it is a handful of small, repeatable inputs your body can actually use.",
    takeaways: [
      "Muscle mass, not age alone, drives most of the change in resting metabolism.",
      "Protein at breakfast and a short daily walk outperform fasted cardio for most women.",
      "Caffeine and stimulants can mask fatigue; sleep is the actual multiplier.",
    ],
    sections: [
      {
        heading: "What actually changes after 30",
        paragraphs: [
          "Resting metabolic rate declines gradually with age, but the bigger variable is lean muscle. If your activity drops and your protein intake slips, you lose the tissue that burns the most energy at rest. The result feels like a slower metabolism, even when the scale moves slowly.",
          "Hormonal shifts, sleep debt and chronic stress also change how hungry you feel and how well you recover. None of that is a character flaw, and none of it requires a 1,200-calorie reset.",
        ],
      },
      {
        heading: "The three habits that move the needle",
        paragraphs: [
          "First, anchor 25–30g of protein to breakfast. It blunts the mid-morning crash and makes the 3pm biscuit less inevitable. Second, walk for ten minutes after your biggest meal. It helps glucose control and adds up to real weekly movement without a gym membership.",
          "Third, lift something heavy twice a week. Two 25-minute sessions are enough to preserve muscle while you lose fat. If you are new to strength training, a pair of dumbbells and a chair is a complete gym.",
        ],
      },
      {
        heading: "Where a supplement fits (and where it does not)",
        paragraphs: [
          "A well-formulated thermogenic can support energy and cravings, but it cannot outrun a routine that is working against you. Think of it as a small tailwind: green tea catechins, L-carnitine and chromium have reasonable evidence behind them at clinical doses, and they are gentle enough to take daily.",
          "Start with the boring inputs first. If you want a little help while you build them, MetaGlow is designed to be that helper — not the whole plan.",
        ],
      },
    ],
    productSlug: "metaglow-fat-burn",
  },
  "gut-skin-axis": {
    intro:
      "Your skin is not a separate project from your digestion. The two talk constantly, and for a lot of women the fastest route to a calmer complexion starts in the gut.",
    takeaways: [
      "The gut–skin axis is a real, two-way communication channel involving immunity and the microbiome.",
      "Fibre diversity matters more than any single probiotic strain.",
      "Gentle, consistent support beats a harsh cleanse every time.",
    ],
    sections: [
      {
        heading: "How your gut talks to your skin",
        paragraphs: [
          "Your gut lining is an immune checkpoint. When it is irritated, inflammatory signals can show up elsewhere — often as breakouts, redness or a dull, tired look. The microbiome also influences how you absorb the nutrients skin needs to repair itself.",
          "This is why a week of poor sleep and low-fibre meals can show on your face before it shows anywhere else. It is also why a greens powder is not just a digestion product.",
        ],
      },
      {
        heading: "Build a calmer morning",
        paragraphs: [
          "Start with fibre from real food: berries, oats, beans, leafy greens. Aim for variety across the week rather than the same salad every day. Add fermented foods if you tolerate them, and chew slowly — digestion begins before your stomach.",
          "A greens blend with prebiotic fibre and digestive enzymes can fill the gaps on busy days. Look for minty, low-sugar formulas you will actually drink, because consistency is the active ingredient.",
        ],
      },
      {
        heading: "What to expect, and when",
        paragraphs: [
          "Most women notice less bloating and more regular mornings within one to two weeks. Skin changes take longer — think six to eight weeks — because that is the length of a skin turnover cycle. Take a photo in the same light once a week rather than checking the mirror every morning.",
          "If you have persistent cystic acne, painful bloating or blood in your stool, see a clinician. Supplements are support, not a diagnosis.",
        ],
      },
    ],
    productSlug: "gut-reset-greens",
  },
  "peach-collagen-smoothie": {
    intro:
      "This is the breakfast we make when the morning is already winning: three minutes, five ingredients, ten grams of collagen and no chalky aftertaste.",
    takeaways: [
      "Frozen peach and banana give you natural sweetness without added sugar.",
      "Collagen peptides dissolve in cold liquid and do not change the texture.",
      "Add protein or yoghurt if this is your whole breakfast, not a snack.",
    ],
    sections: [
      {
        heading: "The recipe",
        paragraphs: [
          "Blend one cup of frozen peach slices, half a frozen banana, one scoop of Collagen Glow (peach bellini), 200ml of cold oat milk and a pinch of sea salt. Add 100ml of water if you like it thinner. That is it.",
          "For a thicker, spoonable version, use frozen banana only and skip the water. For a post-workout version, add half a scoop of vanilla protein.",
        ],
      },
      {
        heading: "Why the ingredients earn their place",
        paragraphs: [
          "Peaches bring vitamin C, which is a cofactor in collagen synthesis — your body needs it to use the collagen you just drank. Banana adds potassium and creaminess without ice cream. Oat milk keeps it dairy-free and gentle on most stomachs.",
          "Collagen peptides are hydrolysed, which means they are small enough to absorb efficiently. The evidence is strongest for skin elasticity and joint comfort when taken daily for at least eight weeks.",
        ],
      },
      {
        heading: "Make it a habit, not a project",
        paragraphs: [
          "Freeze portions of peach and banana on Sunday so weekday mornings are assembly, not decision-making. Rinse the blender immediately — future you will be grateful.",
          "If you do not like cold drinks in winter, blend the same ingredients with warm milk and skip the frozen fruit. The collagen does not mind.",
        ],
      },
    ],
    productSlug: "collagen-glow",
  },
  "protein-without-bloat": {
    intro:
      "Hitting 100g of protein should not feel like a second job, and it definitely should not leave you bloated by 2pm. Here is the realistic version we give clients.",
    takeaways: [
      "Spread protein across three or four meals instead of loading it at dinner.",
      "Choose lower-FODMAP sources if you are sensitive: eggs, fish, tofu, rice protein.",
      "Hydration and fibre pacing matter as much as the protein number.",
    ],
    sections: [
      {
        heading: "Why protein can feel heavy",
        paragraphs: [
          "Large protein loads slow gastric emptying, and some powders contain lactose, sugar alcohols or thickeners that ferment in the gut. The result is fullness that tips into discomfort. It is usually the delivery, not the protein itself.",
          "Whey isolate is lower in lactose than concentrate. If dairy is still a problem, rice, pea or pumpkin seed protein are gentler options — though pea can be higher in FODMAPs for some people, so test slowly.",
        ],
      },
      {
        heading: "A realistic 100g day",
        paragraphs: [
          "Breakfast: two eggs and Greek yoghurt with berries (30g). Lunch: chicken or tofu bowl with quinoa (30g). Snack: a shake with rice protein and a banana (20g). Dinner: salmon with potatoes and greens (30g). Nothing heroic, nothing bland.",
          "If you are plant-based, combine legumes with grains and add a protein powder once a day. Tofu, tempeh and edamame are your highest-density options.",
        ],
      },
      {
        heading: "The bloat-proof rules",
        paragraphs: [
          "Drink water between meals rather than chugging it with a shake. Increase fibre gradually. Chew properly. And give any new powder a week before you decide it is not for you.",
          "A lean vanilla protein with digestive enzymes can make the snack slot easier, but the foundation is still whole food. Supplements are there to close a gap, not replace the meal.",
        ],
      },
    ],
    productSlug: "lean-vanilla-protein",
  },
};
