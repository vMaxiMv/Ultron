import {valueOfEntryDescriptionAC, valueOfEntryAmountAC} from "../../../redux/Chart_Modals_Interaction_Reducer";

const getOrCreateTooltip = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div');

    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
        tooltipEl.style.borderRadius = '3px';
        tooltipEl.style.color = 'white';
        tooltipEl.style.opacity = 1;
        tooltipEl.style.pointerEvents = 'none';
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.transform = 'translate(-50%, 0)';
        tooltipEl.style.transition = 'all .1s ease';

        chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
};

export const externalTooltipHandler = (context, dispatch) => {
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);

    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
    }

    const label = tooltip.dataPoints[0].label  || '';
    const value = tooltip.dataPoints[0].parsed.y  || '';
    const id_user = tooltip.dataPoints[0].dataset.userId;
    const number_slot = tooltip.dataPoints[0].dataIndex;
    const description = tooltip.dataPoints[0].dataset.description[number_slot];

    dispatch(valueOfEntryAmountAC(value))
    dispatch(valueOfEntryDescriptionAC(description))

    const html = `
    <div>
      <span>${label}: ${value}</span>
      <br>
      <span>${description}</span>
    </div>
  `;

    tooltipEl.innerHTML = html;

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
};