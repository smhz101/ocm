describe('OffCanvasMenu (core)', () => {
  let instance;
  beforeEach(() => {
    document.body.innerHTML = `
      <nav class="main-menu"><ul>
        <li><a href="/">Home</a></li>
        <li><a href="#section">Section</a></li>
      </ul></nav>
    `;
    $('.main-menu').offCanvasMenu();
    instance = $('.main-menu').data('offCanvasMenu');
  });

  test('panel starts hidden', () => {
    expect(instance.$panel.attr('aria-hidden')).toBe('true');
  });

  test('open() shows the panel', () => {
    instance.open();
    expect(instance.$panel.attr('aria-hidden')).toBeUndefined();
    expect(instance.$panel.css('transform')).toMatch(/translateX\(0\)/);
  });

  test('toggle() flips open/close', () => {
    instance.toggle();
    expect(instance.$panel.attr('aria-hidden')).toBeUndefined();
    instance.toggle();
    expect(instance.$panel.attr('aria-hidden')).toBe('true');
  });

  test('same-page anchor click closes panel', () => {
    instance.open();
    instance.$panel.find('a[href="#section"]').trigger('click');
    expect(instance.$panel.attr('aria-hidden')).toBe('true');
  });
});
