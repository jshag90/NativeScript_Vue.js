<template>
    <Page class="page">
        <ActionBar title="Home" class="action-bar" />
        <ScrollView>
            <StackLayout class="home-panel">

                <ListView class="list-group" for="post in posts" @itemTap="onItemTap"
                    style="height:2000px">
                    <v-template>
                        <FlexboxLayout flexDirection="row" class="list-group-item">
                            <Image :src="post.data.thumbnail" class="thumb img-circle" />
                            <Label :text="post.data.title" class="list-group-item-heading"
                                style="width: 60%" />
                        </FlexboxLayout>
                    </v-template>
                </ListView>

                <Label textWrap="true" :text="this.textFieldValue" class="h2 description-label" />
                <TextField v-model="textFieldValue" hint="Enter text..." />
                <Button class="button" text="Button" @tap="onButtonTap" />
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    const Vue = require("nativescript-vue");

    const AnotherPage = {
        props: ["imageSrc"],
        methods: {
            onButtonTap() {
                console.log("Button was pressed");
                this.$navigateBack();
            }
        },
        template: `
            <Page>
                <ActionBar title="Another"/>
				<StackLayout> 
                    <Image :src="imageSrc"  />
                    <Button text="Back" class="button" @tap="onButtonTap"/>
				</StackLayout>
            </Page>`
    };

    export default {
        mounted() {
            fetch("https://reddit.com/r/aww.json")
                .then(response => response.json())
                .then(data => {
                    this.posts = data.data.children;
                });
        },
        data() {
            return {
                posts: [],
                countries: [{
                        name: "Australia",
                        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/au.png"
                    },
                    {
                        name: "Belgium",
                        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/be.png"
                    },
                    {
                        name: "Bulgaria",
                        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/bg.png"
                    },
                    {
                        name: "Canada",
                        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ca.png"
                    },
                    {
                        name: "Switzerland",
                        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ch.png"
                    },
                    {
                        name: "China",
                        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/cn.png"
                    },
                    {
                        name: "Czech Republic",
                        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/cz.png"
                    },
                    {
                        name: "Germany",
                        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/de.png"
                    },
                    {
                        name: "Spain",
                        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/es.png"
                    },
                    {
                        name: "Ethiopia",
                        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/et.png"
                    },
                    {
                        name: "Croatia",
                        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/hr.png"
                    },
                    {
                        name: "Hungary",
                        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/hu.png"
                    },
                    {
                        name: "Italy",
                        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/it.png"
                    },
                    {
                        name: "Jamaica",
                        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/jm.png"
                    },
                    {
                        name: "Romania",
                        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ro.png"
                    },
                    {
                        name: "Russia",
                        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ru.png"
                    },
                    {
                        name: "United States",
                        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/us.png"
                    }
                ],

                textFieldValue: ""
            };
        },

        methods: {
            onItemTap: function(args) {
                console.log(
                    "Item with index: " + args.item.data.thumbnail +
                    " tapped"
                );

                this.$navigateTo(AnotherPage, {
                    props: {
                        imageSrc: args.item.data.thumbnail
                    }
                });
            }
        }
    };
</script>

<style scoped>
    .home-panel {
        vertical-align: center;
        font-size: 20;
        margin: 15;
    }

    .description-label {
        margin-bottom: 15;
    }
</style>