<template>
    <section id="hero" class="bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div class="text-center">
                <h1 class="text-4xl md:text-6xl font-extrabold mb-4 animated-title">
                    Compile ton burger, savoure le résultat.
                </h1>
                <p class="text-xl md:text-2xl mb-8 text-red-100 typewriter-first">Vue.js côté front, sauce maison côté food.</p>
                <p class="text-xl md:text-2xl mb-8 text-red-100 typewriter-second">Livraison Express côté back, render croustillant côté client.</p>
                <a href="#menu" class="inline-block bg-white text-red-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300 mt-6">
                    Voir le Menu
                </a>
            </div>
        </div>
    </section>
</template>

<style scoped>
    .animated-title {
        background: linear-gradient(
            45deg,
            #ffffff,
            #ffffff,
            #dc2626,
            #ffffff,
            #ffffff,
            #991b1b
        );
        background-size: 400% 400%;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: gradientShift 3s ease-in-out infinite, glow 2s ease-in-out infinite alternate, float 4s ease-in-out infinite;
        position: relative;
    }

    .typewriter-first {
        overflow: hidden;
        white-space: nowrap;
        width: 0;
        animation: typing-cycle-first 8s linear infinite;
        margin: 0 auto;
        max-width: fit-content;
    }

    .typewriter-second {
        overflow: hidden;
        white-space: nowrap;
        width: 0;
        animation: typing-cycle-second 8s linear infinite;
        margin: 0 auto;
        max-width: fit-content;
    }

    /* Animation pour la première ligne */
    @keyframes typing-cycle-first {
        0% {
            width: 0;
        }
        25% {
            width: 100%;
        }
        62.5% {
            width: 100%;
        }
        87.5% {
            width: 0;
        }
        100% {
            width: 0;
        }
    }

    /* Animation pour la deuxième ligne */
    @keyframes typing-cycle-second {
        0% {
            width: 0;
        }
        25% {
            width: 0;
        }
        50% {
            width: 100%;
        }
        87.5% {
            width: 100%;
        }
        100% {
            width: 0;
        }
    }

    @keyframes gradientShift {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    @keyframes glow {
        from {
            filter: drop-shadow(0 0 15px rgba(220, 38, 38, 0.4)) drop-shadow(0 0 25px rgba(251, 191, 36, 0.3));
        }
        to {
            filter: drop-shadow(0 0 25px rgba(220, 38, 38, 0.7)) drop-shadow(0 0 35px rgba(251, 191, 36, 0.5));
        }
    }

    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-8px);
        }
    }

    .animated-title::before {
        content: '';
        position: absolute;
        top: -20px;
        left: -20px;
        right: -20px;
        bottom: -20px;
        background: radial-gradient(circle at 20% 20%, rgba(220, 38, 38, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 80% 80%, rgba(251, 191, 36, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 40% 70%, rgba(220, 38, 38, 0.05) 0%, transparent 50%);
        animation: sparkle 4s ease-in-out infinite;
        pointer-events: none;
        z-index: -1;
    }

    @keyframes sparkle {
        0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
        }
        50% {
            opacity: 0.7;
            transform: scale(1.2);
        }
    }
</style>