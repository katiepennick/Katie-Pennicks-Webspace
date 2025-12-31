(function () {
  function $(id) {
    return document.getElementById(id);
  }

  const grid = document.getElementById("bird-grid");
  if (!grid) return;

  const nameEl = $("bw-name");
  const commonEl = $("bw-common");
  const photoEl = $("bw-photo");
  const sizeEl = $("bw-size");
  const speciesEl = $("bw-species");
  const spottedEl = $("bw-spotted");
  const backstoryEl = $("bw-backstory");

  function updatePreviewFromRadio(radio) {
    const name = radio.dataset.name || "Unknown bird";
    const common = radio.dataset.common || "";
    const species = radio.dataset.species || "";
    const size = radio.dataset.size || "";
    const spotted = (radio.dataset.spotted || "").trim();
    const backstory = radio.dataset.backstory || "";
    const photo = radio.dataset.photo || "";
    const sprite = radio.dataset.sprite || "";

    nameEl.textContent = name;

    if (common) {
      commonEl.textContent = common;
      commonEl.style.display = "";
    } else {
      commonEl.textContent = "";
      commonEl.style.display = "none";
    }

    sizeEl.textContent = size || "—";
    speciesEl.innerHTML = species ? `<em>${escapeHtml(species)}</em>` : "—";
    spottedEl.textContent = spotted ? spotted : "—";
    backstoryEl.textContent = backstory || "—";

    // Prefer full photo; fallback to sprite if missing
    const imgSrc = photo || sprite;
    if (imgSrc) {
      photoEl.src = imgSrc;
      photoEl.alt = `${name}${common ? ` (${common})` : ""} photo`;
    }
  }

  // Basic HTML escape for the species string since we inject it into innerHTML
  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  // Wire up change events
  const radios = grid.querySelectorAll('input[type="radio"][name="bird"]');
  radios.forEach((r) => {
    r.addEventListener("change", () => updatePreviewFromRadio(r));
  });

  // Initialize preview from checked
  const checked = grid.querySelector(
    'input[type="radio"][name="bird"]:checked'
  );
  if (checked) updatePreviewFromRadio(checked);
})();
