export function initializeSqlTool() {
    const extractBtn = document.getElementById('extractParamsBtn');
    const replaceBtn = document.getElementById('replaceParamsBtn');
    const copyBtn = document.getElementById('copyBtn');

    if (extractBtn) extractBtn.addEventListener('click', extractParams);
    if (replaceBtn) replaceBtn.addEventListener('click', replaceParams);
    if (copyBtn) copyBtn.addEventListener('click', copySQL);
}

function extractParams() {
    const sql = document.getElementById("sqlInput")?.value || "";
    const matches = [...new Set(sql.match(/'Parm\d+'/g))];

    const container = document.getElementById("paramsContainer");
    if (!container) return;

    container.innerHTML = matches?.length
        ? matches.map(p => `<input type="text" class="param-input block my-2 p-2 w-full border rounded-md" placeholder="替換 ${p}" data-param="${p}">`).join("")
        : "<p class='text-gray-600'>未找到任何 'ParmX' 參數。</p>";
}

function replaceParams() {
    let sql = document.getElementById("sqlInput")?.value || "";
    document.querySelectorAll(".param-input").forEach(input => {
        const param = input.dataset.param;
        const value = input.value.replace(/'/g, "''");
        sql = sql.replace(new RegExp(param.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'),
