<template>
    <div id="app">
        <div id="leftBar">
            <div id="io-buttons">
                <div id="load-btn">Load</div>
                <div id="save-btn">Save</div>
            </div>
            <div id="load-example-btn" @click="onLoadExample()">Load Example</div>
            <div id="scenario-section">
                <p id="scenario-section-heading">Scenario</p>
                <p id="scenario-name">{{scenarioName}}</p>
                <div id="frame-section">
                    <div
                            v-for="(graph, index) in graphs"
                            :key="index"
                            class="frame"
                            @click="onFrameClick(index)"
                    >
                        {{graph.name}}
                    </div>
                </div>
            </div>
        </div>
        <div id="graph"></div>
    </div>
</template>

<script>
import * as d3 from 'd3';
// eslint-disable-next-line
    import * as graphviz from 'd3-graphviz';
import { onMounted, ref } from 'vue';
import example from './example';

export default {
  setup() {
    const graphs = ref([]);
    const scenarioName = ref('');
    let gv;

    onMounted(() => {
      gv = d3.select('#graph')
        .graphviz();
      // eslint-disable-next-line no-console
      gv.onerror(() => console.error('Given graph is not in dot notation'));
    });

    const onLoadExample = () => {
      graphs.value = example.frames;
      gv
        .renderDot(graphs.value[0].graph);
      scenarioName.value = example.name;
    };

    const onFrameClick = (index) => {
      gv
        .transition(d3.transition().duration(500))
        .renderDot(graphs.value[index].graph);
    };

    return {
      graphs, onLoadExample, onFrameClick, scenarioName,
    };
  },
};
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
        /*background-color: #E5E5E5;*/
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

    #load-btn, #save-btn {
        height: 30px;
        width: fit-content;
        padding: 5px 5px 0 5px;
        background-color: #E5E5E5;
        border-radius: 4px;
        cursor: pointer;
        transition: .1s;
    }

    #load-btn:hover, #save-btn:hover {
        background-color: #b8b8b8;
    }

    #load-example-btn {
        margin-top: 20px;
        height: 30px;
        width: fit-content;
        padding: 5px 5px 0 5px;
        background-color: #E5E5E5;
        border-radius: 4px;
        cursor: pointer;
        transition: .1s;
    }

    #load-example-btn:hover {
        background-color: #b8b8b8;
    }

    #scenario-section {
        margin-top: 50px;
    }

    #scenario-section-heading {
        font-size: 20px;
    }

    #frame-section {
        margin-top: 15px;
        max-height: 500px;
        width: 140px;
        background-color: #374a5c;
        overflow-y: auto;
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }

    #frame-section::-webkit-scrollbar {
        display: none;
    }

    .frame {
        width: 100%;
        background-color: #E5E5E5;
        cursor: pointer;
        transition: .1s;
    }

    .frame:hover {
        background-color: #b8b8b8;
    }
</style>
