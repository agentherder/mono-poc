export async function toggleSidePanel() {
  // https://developer.chrome.com/docs/extensions/reference/api/sidePanel
  if (!chrome?.sidePanel) return;
  const panelOptions = await chrome.sidePanel.getOptions({});
  if (panelOptions.enabled) {
    await chrome.sidePanel.setOptions({ enabled: false });
    return;
  }
  await chrome.sidePanel.setOptions({
    path: 'sidepanel.html',
    enabled: true,
  });
  const win = await chrome.windows.getCurrent();
  if (win.id === undefined) return;
  await chrome.sidePanel.open({ windowId: win.id });
}
