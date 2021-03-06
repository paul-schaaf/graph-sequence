<template>
    <div id="app">
        <div id="leftBar">
            <div id="io-buttons">
                <div
                        id="load-text-btn"
                        class="load-btn"
                        @click="onLoadFromText()"
                >
                    Load from text</div>
                <div
                        id="load-json-btn"
                        class="load-btn"
                        @click="onLoadFromJson()"
                >
                    Load from json
                </div>
                <div
                        id="load-example-btn"
                        class="load-btn"
                        @click="onLoadExample()">
                    Load Example
                </div>
                <div id="save-btn" @click="save()">Save as json</div>
            </div>
            <label id="transitions-checkbox-label">
                <input v-model="transitionsEnabled" type="checkbox" id="transitions-checkbox"/>
                Transitions
            </label>
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
            <p id="source-link">🐧 <a href="https://github.com/paul-schaaf/graph-sequence" target="_blank" rel="noreferrer noopener">source</a> 🐧</p>
        </div>
        <div id="graph"></div>
        <div id="load-from-text-modal" class="modal-hider">
            <div
                    id="load-from-text-modal-content"
            >
                Copy your entire sequence of graphs here without a delimiter! Example:
                <p class="code">
                    <code>digraph {a -> b} digraph {a -> b -> c} digraph {a; b -> c}
                    </code>
                </p>
                <input v-model="plaintextScenario" type="text"/>
                <input type="submit" class="submit-btn" @click="loadPlaintextScenario">
            </div>
        </div>
        <div id="load-from-json-modal" class="modal-hider">
            <div
                    id="load-from-json-modal-content"
            >
                Copy your json here in the following format:
                <p>
                    <pre>
                    <code ref="jsonRef">
{
    "name":"scenarioName",
    "frames":
        [
            {
                "name":"something happens",
                "graph":"digraph {a -> b}"
            },
            {
                "name":"another thing happens",
                "graph":"digraph {a -> b -> c}"
            }
        ]
}
                    </code>
                    </pre>
                </p>
                <input v-model="jsonScenario" type="text"/>
                <input type="submit" class="submit-btn" @click="loadJsonScenario()">
            </div>
        </div>
        <div class="modal">
            <div class="modal-inner">
                <span data-modal-close>&times;</span>
                <div class="modal-content"></div>
            </div>
        </div>
    </div>
</template>

<script>
import 'highlight.js/styles/atelier-lakeside-dark.css';
import { saveAs } from 'file-saver';
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';

import VanillaModal from 'vanilla-modal';
import * as d3 from 'd3';
// eslint-disable-next-line
import * as graphviz from 'd3-graphviz';
import {
  onMounted, ref,
} from 'vue';
import example from './example';
import { createFramesFromPlaintext } from './frameCreation';

hljs.registerLanguage('json', json);

export default {
  setup() {
    const graphs = ref([]);
    const scenarioName = ref('');
    const transitionsEnabled = ref(true);
    const plaintextScenario = ref('');
    const jsonScenario = ref('');
    const jsonRef = ref(null);

    let gv;
    let modal;

    onMounted(() => {
      gv = d3.select('#graph')
        .graphviz();

      // eslint-disable-next-line no-console
      gv.onerror(() => console.error('Given graph is not in dot notation'));

      modal = new VanillaModal();

      hljs.highlightBlock(jsonRef.value);
    });

    const load = (scenario) => {
      graphs.value = scenario.frames;
      // eslint-disable-next-line no-underscore-dangle
      gv._transition = undefined;
      gv.renderDot(graphs.value[0].graph);
      scenarioName.value = scenario.name;
    };

    const onLoadExample = () => {
      load(example);
    };

    const onLoadFromText = () => modal.open('#load-from-text-modal');
    const onLoadFromJson = () => modal.open('#load-from-json-modal');

    const loadPlaintextScenario = () => {
      if (plaintextScenario.value === '') {
        return;
      }
      modal.close('#load-from-text-modal');
      const frames = createFramesFromPlaintext(plaintextScenario.value);
      plaintextScenario.value = '';
      load({ name: 'unknown', frames });
    };

    const loadJsonScenario = () => {
      if (jsonScenario.value === '') {
        return;
      }
      let scenario;
      try {
        scenario = JSON.parse(jsonScenario.value);
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert('Invalid JSON');
        return;
      }
      modal.close('#load-from-json-modal');

      load(scenario);
      jsonScenario.value = '';
    };

    const save = () => {
      if (scenarioName.value === '') {
        // eslint-disable-next-line no-alert
        alert('Please load a scenario to save it');
        return;
      }
      const file = new File(
        [JSON.stringify({ name: scenarioName.value, frames: graphs.value })],
        `${scenarioName.value}.json`,
      );
      saveAs(file);
    };

    const onFrameClick = (index) => {
      if (transitionsEnabled.value) {
        gv = d3.select('#graph')
          .graphviz().transition(d3.transition().duration(500));
        // eslint-disable-next-line no-console
        gv.onerror(() => console.error('Given graph is not in dot notation'));
      } else {
        // eslint-disable-next-line no-underscore-dangle
        gv._transition = undefined;
      }
      gv
        .renderDot(graphs.value[index].graph);
    };

    return {
      graphs,
      onLoadExample,
      onFrameClick,
      scenarioName,
      transitionsEnabled,
      onLoadFromText,
      onLoadFromJson,
      plaintextScenario,
      loadPlaintextScenario,
      save,
      jsonRef,
      jsonScenario,
      loadJsonScenario,
    };
  },
};
</script>

<style>
    #source-link {
        position: absolute;
        bottom: 15px;
    }

    #source-link a {
        text-decoration: none;
        color: #2c3e50;
    }

    .submit-btn {
        cursor: pointer;
        border: 0;
        background-color: #E5E5E5;
        transition: .2s;
    }

    .submit-btn:hover {
        background-color: #b8b8b8;
    }

    #load-from-text-modal-content {
        width: 300px;
        padding: 30px;
    }

    #load-from-text-modal-content .code {
        margin-top: 10px;
    }

    #load-from-text-modal-content input {
        width: 100%;
        height: 30px;
        margin-top: 20px;
    }

    #load-from-json-modal-content {
        width: 500px;
        padding: 30px;
    }

    @media (max-width: 600px) {
        #load-from-json-modal-content {
            width: 300px;
            padding: 30px;
        }
    }

    #load-from-json-modal-content pre {
        height: 290px;
    }

    #load-from-json-modal-content input {
        width: 100%;
        height: 30px;
    }

    #load-from-json-modal-content input[type=submit] {
        width: 100%;
        height: 30px;
        margin-top: 20px;
    }

    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    body, html {
        height: 100%;
    }

    .code {
        padding: 5px;
        background-color: #161f2a;
        color: white;
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
        padding-top: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #io-buttons {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #io-buttons div {
        margin-top: 15px;
    }

    #graph {
        flex-grow: 1;
    }

    #graph svg {
        width: 100%;
    }

    .load-btn, #save-btn {
        height: 30px;
        width: fit-content;
        padding: 5px 5px 0 5px;
        background-color: #E5E5E5;
        border-radius: 4px;
        cursor: pointer;
        transition: .1s;
    }

    .load-btn:hover, #save-btn:hover {
        background-color: #b8b8b8;
    }

    .load-btn {
        height: 30px;
        width: fit-content;
        padding: 5px 5px 0 5px;
        background-color: #E5E5E5;
        border-radius: 4px;
        cursor: pointer;
        transition: .1s;
    }

    .load-btn:hover {
        background-color: #b8b8b8;
    }

    #transitions-checkbox-label {
        margin-top: 20px;
        cursor: pointer;
    }

    #transitions-checkbox {
        cursor: pointer;
        transform: translateY(1px);
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
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
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

    .modal {
        display: none;
    }

    .vanilla-modal .modal {
        display: block;
        position: fixed;
        content: "";
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: -1;
        opacity: 0;
        transition: opacity 0.2s, z-index 0s 0.2s;
        text-align: center;
        overflow: hidden;
        overflow-y: auto;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
    }

    .vanilla-modal .modal > * {
        display: inline-block;
        white-space: normal;
        vertical-align: middle;
        text-align: left;
    }

    .vanilla-modal .modal:before {
        display: inline-block;
        overflow: hidden;
        width: 0;
        height: 100%;
        vertical-align: middle;
        content: "";
    }

    .vanilla-modal.modal-visible .modal {
        z-index: 99;
        opacity: 1;
        transition: opacity 0.2s;
    }

    .modal-inner {
        position: relative;
        overflow: hidden;
        max-width: 90%;
        max-height: 90%;
        overflow-x: hidden;
        overflow-y: auto;
        background: #fff;
        z-index: -1;
        opacity: 0;
        transform: scale(0);
        transition: opacity 0.2s, transform 0.2s, z-index 0s 0.2s;
    }
    .modal-visible .modal-inner {
        z-index: 100;
        opacity: 1;
        transform: scale(1);
        transition: opacity 0.2s, transform 0.2s;
    }

    [data-modal-close] {
        position: absolute;
        z-index: 2;
        right: 0;
        top: 0;
        width: 25px;
        height: 25px;
        line-height: 25px;
        font-size: 13px;
        cursor: pointer;
        text-align: center;
        background: #fff;
        box-shadow: -1px 1px 2px rgba(0,0,0,0.2);
    }

    body.vanilla-modal .modal-hider {
        position: absolute;
        left: -99999em;
    }
</style>
