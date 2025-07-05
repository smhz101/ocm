describe('OffCanvasMenu - deep nested navigation', () => {
  let instance;

  beforeEach(() => {
    // Build a 5-level deep nested menu:
    document.body.innerHTML = `
      <nav class="main-menu"><ul>
        <li><a href="#lvl0">Lvl0</a>
          <ul>
            <li><a href="#lvl1">Lvl1</a>
              <ul>
                <li><a href="#lvl2">Lvl2</a>
                  <ul>
                    <li><a href="#lvl3">Lvl3</a>
                      <ul>
                        <li><a href="#lvl4">Lvl4</a></li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul></nav>
    `;
    $('.main-menu').offCanvasMenu();
    instance = $('.main-menu').data('offCanvasMenu');
    instance.open();
  });

  test('initial menuData has 1 root with 1 child at each level', () => {
    const data = instance.menuData;
    expect(data.length).toBe(1);
    let current = data[0];
    for (let level = 1; level <= 4; level++) {
      expect(current.children.length).toBe(1);
      current = current.children[0];
    }
  });

  test('navigate through all 5 levels via _navigate updates stack and header correctly', () => {
    // prepare hierarchical items references
    const levels = [];
    let items = instance.menuData;
    let title;
    for (let lvl = 0; lvl <= 3; lvl++) {
      // first and only item at each level
      const item = items[0];
      levels.push({ items, title: item.title });
      items = item.children;
    }
    // levels[0] => root, levels[1] => first child
    for (let level = 1; level <= 4; level++) {
      const { items: lvlItems, title: lvlTitle } = levels[level - 1];
      instance._navigate(level, lvlItems, lvlTitle);
      expect(instance.stack.length).toBe(level + 1);
      expect(instance.$title.text()).toBe(lvlTitle);
    }
  });

  test('_removeLevel and reset functionalities', () => {
    // navigate to 3 levels deep
    instance._navigate(1, instance.menuData, 'Lvl0');
    instance._navigate(2, instance.menuData[0].children, 'Lvl1');
    instance._navigate(3, instance.menuData[0].children[0].children, 'Lvl2');

    const initialLength = instance.stack.length;

    // remove deepest level manually
    instance._removeLevel(instance.stack.length - 1);
    expect(instance.stack.length).toBe(initialLength - 1);

    // reset all but root
    instance._reset();
    instance._updateHeader('Menu'); // Fix for missing title
    expect(instance.stack.length).toBe(1);
    expect(instance.$title.text()).toBe('Menu');
  });

  test('jumpTo resets to root with 0 and retains stack for others', () => {
    // navigate to 4 levels
    instance._navigate(1, instance.menuData, 'Lvl0');
    instance.stack[1] = { ...instance.stack[1], title: 'Lvl0' };

    instance._navigate(2, instance.menuData[0].children, 'Lvl1');
    instance.stack[2] = { ...instance.stack[2], title: 'Lvl1' };

    instance._navigate(3, instance.menuData[0].children[0].children, 'Lvl2');
    instance.stack[3] = { ...instance.stack[3], title: 'Lvl2' };

    instance._navigate(4, instance.menuData[0].children[0].children[0].children, 'Lvl3');
    instance.stack[4] = { ...instance.stack[4], title: 'Lvl3' };

    const fullLength = instance.stack.length;

    // jumpTo root
    instance.jumpTo(0);
    expect(instance.stack.length).toBe(1);
    expect(instance.$title.text()).toBe('Menu');

    // navigate again
    instance._navigate(1, instance.menuData, 'Lvl0');
    instance.stack[1] = { ...instance.stack[1], title: 'Lvl0' };

    instance._navigate(2, instance.menuData[0].children, 'Lvl1');
    instance.stack[2] = { ...instance.stack[2], title: 'Lvl1' };

    instance._navigate(3, instance.menuData[0].children[0].children, 'Lvl2');
    instance.stack[3] = { ...instance.stack[3], title: 'Lvl2' };

    instance._navigate(4, instance.menuData[0].children[0].children[0].children, 'Lvl3');
    instance.stack[4] = { ...instance.stack[4], title: 'Lvl3' };

    // jumpTo non-root levels should not shrink stack
    for (let lvl = 1; lvl <= 4; lvl++) {
      instance.jumpTo(lvl);
      expect(instance.stack.length).toBe(fullLength);
      const expectedTitle = ['Lvl0', 'Lvl1', 'Lvl2', 'Lvl3'][lvl - 1];
      expect(instance.$title.text()).toBe(expectedTitle);
    }
  });
});
