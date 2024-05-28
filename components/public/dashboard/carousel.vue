<script>
export default {
    name: 'CarouselComponent',
};
</script>

<template>
    <div class="containters">
        <div class="carousel-wrapper">
            <v-carousel cycle interval="5000" hide-delimiter-background cover>
                <v-carousel-item src="/images/backgrounds/c1.jpg"></v-carousel-item>
                <v-carousel-item src="/images/backgrounds/c2.jpg"></v-carousel-item>
                <v-carousel-item src="/images/backgrounds/c3.jpg"></v-carousel-item>
                <v-carousel-item src="/images/backgrounds/c4.jpg"></v-carousel-item>
                <v-carousel-item src="/images/backgrounds/c5.jpeg"></v-carousel-item>
            </v-carousel>
        </div>
    </div>
</template>

<style>
.containters{
    display: flex;
    width: 100%;
    justify-content: center;
}
.carousel-wrapper {
    width: 95%;

}

/* .v-carousel-item {
    height: 600px;
} */



/* @media only screen and (max-width: 800px) {
    .carousel-wrapper {
        width: 100%;
        margin: 0 auto;
        margin-top: 5.5rem;
    }

    .v-carousel-item {
        height: 200px;
    }
}

@media only screen and (max-width: 376px) {
    .carousel-wrapper {
        width: 95%;
        margin: 0 auto;
        margin-top: 5.5rem;
    }

    .v-carousel-item {
        height: 150px;
    }
} */

 .v-carousel__controls{
    display: none;
}
.v-window__controls .v-btn i {
    color: #656565
}
</style>