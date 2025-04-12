document.addEventListener('DOMContentLoaded', () => {
    const storyElement = document.getElementById('story');
    const choicesElement = document.getElementById('choices');

    const story = {
        start: {
            title: "The Beginning",
            text: "You are about to embark on a wildlife adventure. Do you want to explore the jungle or the savannah?",
            choices: [
                { text: "Explore the jungle", next: "jungle" },
                { text: "Explore the savannah", next: "savannah" }
            ]
        },
        jungle: {
            title: "Jungle Adventure",
            text: "You enter the dense jungle and hear the sounds of exotic birds and monkeys. Do you want to follow the sound of a waterfall or investigate a rustling bush?",
            choices: [
                { text: "Follow the sound of the waterfall", next: "waterfall" },
                { text: "Investigate the rustling bush", next: "bush" }
            ]
        },
        savannah: {
            title: "Savannah Adventure",
            text: "You step into the vast savannah and see herds of animals grazing. Do you want to approach a group of elephants or follow a pack of lions?",
            choices: [
                { text: "Approach the elephants", next: "elephants" },
                { text: "Follow the lions", next: "lions" }
            ]
        },
        waterfall: {
            title: "Waterfall Discovery",
            text: "In the heart of a lush jungle, where the verdant canopy forms a majestic cathedral of green, a captivating waterfall cascades into a serene pool below. Its crystalline waters tumble over rugged cliffs, creating a symphony of sound that echoes through the dense foliage, beckoning travelers from afar to seek solace in its embrace. \
            <br><br><strong>One tranquil day</strong>, as the sun cast its golden rays upon the jungle floor, Sarah, a weary wanderer with a heart full of dreams, stumbled upon this hidden oasis. Enchanted by the melodious song of the waterfall and the playful antics of a family of monkeys frolicking near the water's edge, she knew that she had found a sanctuary from the chaos of the world. \
            <br><br><em>Perched on a moss-covered rock</em>, Sarah closed her eyes and surrendered herself to the magic of the moment. She let the cool mist of the waterfall caress her skin, washing away the dust of her journey, while the laughter of the monkeys lifted her spirits and filled her soul with joy. \
            <br><br>As the sun began to set, casting a golden hue over the landscape, Sarah noticed a variety of wildlife gathering around the waterfall. Birds of vibrant plumage danced in the air, while small mammals scurried about, all drawn to the life-giving waters. She felt a profound connection to this place, a feeling that transcended the physical realm and touched her very soul. \
            <br><br>That night, Sarah decided to camp by the waterfall, under the watchful eyes of the star-studded sky. The soothing sound of the cascading water lulled her into a deep, restful sleep. In her dreams, she envisioned herself as part of the jungle, living in harmony with the creatures around her, free from the constraints of modern life. \
            <br><br>In the days that followed, Sarah explored the area around the waterfall, discovering hidden trails and secret groves. She marveled at the intricate web of life that thrived in the jungle, each organism playing its part in maintaining the balance of this delicate ecosystem. She found a small grove where orchids bloomed in a riot of colors and where she could sit and listen to the songs of the jungle. \
            <br><br>During one of her explorations, Sarah encountered a local guide named Ramesh, who had spent his entire life in the jungle. He shared stories of the jungle's history, its myths, and the efforts to conserve its natural beauty. Ramesh taught Sarah about the medicinal plants used by the local tribes, the behavior of various animals, and the importance of preserving the delicate balance of the ecosystem. \
            <br><br>Ramesh and Sarah spent many days together, trekking through the dense foliage, crossing streams, and observing the wildlife. One evening, they visited a remote village at the edge of the jungle, where Sarah learned about the villagers' way of life and their deep connection to the land. She was moved by their stories of resilience and their commitment to protecting their environment. \
            <br><br>On her last day at the waterfall, Sarah participated in a conservation project organized by Ramesh and the villagers. They planted trees, cleaned up litter, and set up signs to educate visitors about the importance of protecting the jungle. It was a fulfilling experience, and Sarah felt a sense of accomplishment and hope for the future. \
            <br><br>By the end of her journey, Sarah had found more than just a beautiful place; she had found a piece of herself that had been missing. She realized that true peace and happiness could be found not in the material world, but in the simple, unspoiled beauty of nature. And as she finally bid farewell to the waterfall and its inhabitants, she knew that this magical place would remain in her heart forever. \
            <br><br><b><center>The End</center></b>",
            choices: []
        },
        
        bush: {
            title: "Bush Encounter",
            text: "As you venture deeper into the dense undergrowth of the forest, your senses keenly attuned to the whispers of nature, you come upon a rustling bush. Instinctively, you approach with caution, mindful of the delicate balance of life that thrives in these ancient woods. \
            <br><br>Peering through the foliage, you discover a small deer nestled within the shelter of the bush. Its gentle eyes gaze back at you, wide with fear yet unharmed. You sense its vulnerability and the innocence that emanates from its trembling form. \
            <br><br>With a silent reverence for the beauty of the moment, you choose to tread softly, mindful not to disturb the peaceful serenity that surrounds the frightened creature. Slowly, you back away, offering it the space and solace it seeks in this tranquil corner of the forest. \
            <br><br>As you retreat, a sense of gratitude washes over you—the silent exchange between you and the deer a reminder of the interconnectedness of all living beings. And as you disappear into the depths of the forest, leaving the deer to its sanctuary, you carry with you a newfound appreciation for the delicate dance of life that unfolds in the heart of nature. \
            <br><br>Continuing your journey, you come across a variety of other woodland creatures, each one a testament to the thriving biodiversity of the forest. Birds of all colors sing from the treetops, squirrels dart between branches, and insects buzz around, each playing a vital role in this vibrant ecosystem. \
            <br><br>As night falls, you find a clearing where you set up camp. The forest comes alive with the sounds of nocturnal animals, and the sky above is a canvas of twinkling stars. You sit by the campfire, reflecting on the day's encounters, feeling a profound sense of peace and connection to the world around you. \
            <br><br>In the morning, you awaken to the gentle rays of the sun filtering through the trees. You pack your belongings and prepare to continue your adventure, carrying with you the lessons learned from your time in the forest. The memory of the deer and the serenity of the bush remain etched in your mind, a reminder of the beauty and fragility of life. \
            <br><br>As you leave the forest, you feel a deep sense of fulfillment and a renewed commitment to protect the natural world. The encounters you've had and the connections you've made with the creatures of the forest have left an indelible mark on your soul, and you vow to carry this experience with you, sharing the importance of conservation with others. \
            <br><br>During the next part of your journey, you join a group of researchers studying the forest's biodiversity. You assist them in tracking animal movements, collecting data on plant species, and monitoring the health of the ecosystem. This hands-on experience deepens your understanding of the forest's complexity and the efforts required to preserve it. \
            <br><br>One day, while exploring a particularly dense section of the forest, you come across a hidden waterfall. The sight takes your breath away—it's a place of pristine beauty, untouched by human hands. You spend the day there, documenting the flora and fauna, and simply soaking in the tranquility of the surroundings. \
            <br><br>Your time in the forest culminates in a visit to a local wildlife rehabilitation center. There, you meet dedicated individuals who care for injured and orphaned animals, nursing them back to health and preparing them for release back into the wild. You are inspired by their passion and dedication, and you leave with a sense of hope and purpose. \
            <br><br>As you conclude your adventure, you reflect on all you've experienced and learned. The forest, with its myriad wonders and challenges, has become a part of you. You've forged a deep connection with nature and a commitment to its preservation that will guide you in all your future endeavors. \
            <br><br><b><center>The End</center></b>",
            choices: []
        },
        
        elephants: {
            title: "Elephant Observation",
            text: "As you cautiously approach the group of majestic elephants, you feel a sense of awe wash over you in the presence of these gentle giants. Despite their immense size and power, they exude a peaceful aura that puts you at ease. \
            <br><br>With each careful step, you draw nearer to the herd, mindful not to startle or disturb them. To your relief, they show no signs of concern at your presence, continuing to go about their activities with a calm and steady grace. \
            <br><br>You find a safe vantage point from which to observe them, marveling at the intricate dynamics of their social interactions—the tender moments shared between mother and calf, the playful antics of the younger elephants, and the wise, watchful gaze of the matriarch. \
            <br><br>For a timeless moment, you lose yourself in the beauty of the scene unfolding before you, feeling a profound sense of connection with these magnificent creatures and the natural world that surrounds them. \
            <br><br>As the sun begins to dip below the horizon, casting a warm golden glow over the savanna, you know that it is time to bid farewell to the elephants and return to your own world. With a heart full of gratitude for the opportunity to witness their beauty up close, you quietly make your way back, carrying with you memories of this extraordinary encounter that will stay with you forever. \
            <br><br>On your way back to camp, you reflect on the remarkable intelligence and emotional depth of elephants. You recall the stories you've heard of their ability to mourn their dead, their complex social structures, and their deep familial bonds. These thoughts deepen your respect for these incredible creatures and strengthen your resolve to protect their habitat. \
            <br><br>Back at camp, you share your experiences with fellow travelers, recounting the awe-inspiring moments and the quiet, contemplative time you spent with the elephants. Your story inspires others, and together, you discuss ways to contribute to conservation efforts, ensuring that future generations can also experience the wonder of these majestic beings. \
            <br><br>As the night progresses, you feel a sense of camaraderie with your fellow travelers, united by a shared appreciation for the natural world. The bond you have formed with the elephants and the memories you've created serve as a powerful reminder of the importance of preserving our planet's diverse ecosystems. \
            <br><br>The following day, you join a team of conservationists who are working to track and protect the elephant population. You learn how to use GPS devices to monitor their movements, study their feeding patterns, and understand their social dynamics. This immersive experience gives you a deeper appreciation for the complexities of elephant conservation. \
            <br><br>One afternoon, while out in the field, you witness a poignant moment: an elephant family mourning the loss of one of their own. The herd gathers around the fallen member, their sorrow palpable. This profound display of emotion underscores the intelligence and sensitivity of these magnificent creatures, leaving an indelible mark on your heart. \
            <br><br>Your time with the elephants culminates in a visit to a local school, where you share your experiences with children. You speak about the importance of wildlife conservation and the role that each individual can play in protecting these gentle giants. The children's curiosity and enthusiasm give you hope for the future, knowing that the next generation is eager to make a difference. \
            <br><br>As you prepare to leave the savanna, you take one last look at the vast landscape, the memories of your journey etched in your mind. The elephants, with their wisdom and grace, have taught you invaluable lessons about life, compassion, and the interconnectedness of all living beings. You leave with a renewed sense of purpose and a commitment to continue advocating for the protection of wildlife and their habitats. \
            <br><br><b><center>The End</center></b>",
            choices: []
        },
        
        lions: {
            title: "Lion Encounter",
            text: "With a mixture of trepidation and reverence, you trail behind the pack of lions, keeping a safe distance as they move gracefully through their domain. Their regal presence commands respect, and you find yourself mesmerized by their beauty and power. \
            <br><br>From afar, you observe as they navigate the savanna with effortless grace, their golden coats shimmering in the sunlight as they move with purpose and determination. Each member of the pride plays a vital role in the intricate dance of survival, their bond forged by a shared history of triumphs and challenges. \
            <br><br>Despite the temptation to linger and witness more of their majestic behavior, you recognize the importance of respecting their space and leaving them undisturbed in their natural habitat. With a heavy heart, you acknowledge that it's time to bid farewell to these magnificent creatures. \
            <br><br>As you slowly retreat, mindful not to attract their attention, you carry with you a newfound appreciation for the delicate balance of life in the wilderness. And though your encounter with the lions may be over, the memory of their awe-inspiring presence will stay with you forever, a reminder of the wild beauty that lies beyond the safety of civilization. \
            <br><br>Returning to your camp, you feel a mix of exhilaration and reflection. The experience of observing the lions in their natural habitat has left a lasting impact on you. You can't help but think about the fragile balance of ecosystems and the role that every creature, including humans, plays in maintaining it. \
            <br><br>That night, as you sit around the campfire, you share your encounter with the lions with other adventurers. Your story captivates them, sparking a lively discussion about wildlife conservation and the efforts needed to protect these majestic predators. \
            <br><br>The next day, you join a team of researchers studying the lion population in the area. You learn about their behavior, tracking techniques, and the challenges they face due to habitat loss and human-wildlife conflict. The researchers' dedication and passion inspire you, and you eagerly participate in their fieldwork. \
            <br><br>One evening, while observing a pride from a safe distance, you witness a remarkable scene: a lioness teaching her cubs how to hunt. The careful instruction and playful practice sessions are a testament to the intricate social structure and survival skills of lions. This intimate glimpse into their lives deepens your admiration for these powerful creatures. \
            <br><br>As your time in the savanna draws to a close, you reflect on the profound experiences you've had and the connections you've made with the natural world. The lions have taught you about strength, resilience, and the importance of preserving their habitat. You leave with a sense of responsibility and a commitment to support conservation efforts, knowing that the future of these magnificent animals depends on our collective actions. \
            <br><br>Back home, you share your journey with friends and family, using your stories and experiences to raise awareness about the importance of wildlife conservation. You become an advocate for protecting the natural world, inspired by the memories of your time with the lions and driven by a passion to ensure their survival for generations to come. \
            <br><br><b><center>The End</center></b>",
            choices: []
        },
        
    };

    function showStory(storyNode) {
        storyElement.innerHTML = `<h2>${storyNode.title}</h2>${storyNode.text}`;
        choicesElement.innerHTML = '';
        storyNode.choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice.text;
            button.addEventListener('click', () => showStory(story[choice.next]));
            choicesElement.appendChild(button);
        });
    }

    showStory(story.start);
});
