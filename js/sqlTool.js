export function initializeSqlTool() {
    const extractBtn = document.getElementById('extractParamsBtn');
    const replaceBtn = document.getElementById('replaceParamsBtn');
    const copyBtn = document.getElementById('copyBtn');

    if (extractBtn) extractBtn.addEventListener('click', extractParams);
    if (replaceBtn) replaceBtn.addEventListener('click', replaceParams);
    if (copyBtn) copyBtn.addEventListener('click', copySQL);
}

export function initializeAddSbAppendTool() {
    const convertBtn = document.getElementById('convertSqlBtn');
    const copyButtons = document.querySelectorAll('.copy-button');

    if (convertBtn) convertBtn.addEventListener('click', convertSql);
    copyButtons.forEach(button => {
        const targetId = button.dataset.copyTarget;
        if (targetId) {
            button.addEventListener('click', () => copyToClipboard(targetId));
        }
    });
}

export function initializeQuestionMarkTool() {
    const replaceBtn = document.getElementById('replaceSQLBtn');
    const copyBtn = document.getElementById('copyBtn');

    if (replaceBtn) replaceBtn.addEventListener('click', replaceSQL);
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
        sql = sql.replace(new RegExp(param.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), `'${value}'`);
    });
    document.getElementById("output").innerText = sql;
}

function convertSql() {
    const sql = document.getElementById("sqlInput")?.value || "";
    const newSql = sql
        .replace(/'/g, "''")
        .replace(/(\w+)\s*=\s*([^,]+)/g, '$1 = $2')
        .replace(/,\s*$/, '')
        .replace(/^\s*|\s*$/g, '');
    document.getElementById("output").innerText = newSql;
}

function replaceSQL() {
    let sql = document.getElementById("sqlInput")?.value || "";
    sql = sql.replace(/'/g, "''");
    document.getElementById("output").innerText = sql;
}

function copyToClipboard(id) {
    const element = document.getElementById(id);
    if (element) {
        navigator.clipboard.writeText(element.innerText)
            .then(() => alert("內容已複製到剪貼簿！"))
            .catch(err => alert("複製失敗，請手動複製：" + err));
    }
}

function copySQL() {
    const output = document.getElementById("output");
    if (output) {
        navigator.clipboard.writeText(output.innerText)
            .then(() => alert("SQL 內容已複製到剪貼簿！"))
            .catch(err => alert("複製失敗，請手動複製：" + err));
    }
}
