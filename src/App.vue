<template>
    <div id="app">
        <div id="leftBar">
            <div id="io-buttons">
                <div id="load-btn">Load</div>
                <div id="save-btn">Save</div>
            </div>
            <div id="load-example-btn">Load Example</div>
        </div>
        <div id="graph"></div>
    </div>
</template>

<script>
    import * as d3 from 'd3';
    // eslint-disable-next-line
    import * as graphviz from 'd3-graphviz';
    import {onMounted} from 'vue';

    export default {
        setup() {
            let gv;

            onMounted(() => {
                gv = d3.select("#graph")
                    .graphviz();
                gv.onerror(() => console.error("Given graph is not in dot notation"));

                gv.renderDot('digraph {a;b;c;d;e}');
            });

            const onButtonClickNext = () => gv
                .transition(d3.transition().duration(500))
                .renderDot('digraph {a -> b}');

            return {onButtonClickNext}
        }
    }
</script>

<style>
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    body, html {
        height: 100%;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100%;
        width: 100%;
        display: flex;
        background-color: #E5E5E5;
    }

    #leftBar {
        height: 100%;
        width: 200px;
        min-width: 200px;
        background-color: lightslategrey;
        padding-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #io-buttons {
        display: flex;
        justify-content: space-evenly;
        width: 100%;
    }

    #graph {
        flex-grow: 1;
    }

    #graph svg {
        width: 100%;
    }

    #graph svg polygon {
        fill: #E5E5E5;
    }

    #load-btn, #save-btn {
        height: 30px;
        width: fit-content;
        padding: 5px 5px 0 5px;
        background-color: #E5E5E5;
        border-radius: 4px;
        cursor: pointer;
    }

    #load-example-btn {
        margin-top: 20px;
        height: 30px;
        width: fit-content;
        padding: 5px 5px 0 5px;
        background-color: #E5E5E5;
        border-radius: 4px;
        cursor: pointer;
    }
</style>
