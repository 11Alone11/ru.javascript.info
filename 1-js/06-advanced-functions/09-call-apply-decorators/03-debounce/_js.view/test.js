describe("debounce", function() {
  before(function() {
    this.clock = sinon.useFakeTimers();
  });

  after(function() {
    this.clock.restore();
  });

<<<<<<< HEAD
  it("вызывает функцию один раз в 'ms' мс", function() {
=======
  it("trigger the fuction execution immediately", function () {
    let mode;
    const f = () => mode='leading';
    
    debounce(f, 1000)(); // runs without a delay
  
    assert.equal(mode, 'leading');
  });
  
  it("calls the function at maximum once in ms milliseconds", function() {
>>>>>>> c89ddc5d92195e08e2c32e30526fdb755fec4622
    let log = '';

    function f(a) {
      log += a;
    }

    f = debounce(f, 1000);

    f(1); // вызвана
    f(2); // проигнорирована

    setTimeout(() => f(3), 100);  // проигнорирована (слишком рано)
    setTimeout(() => f(4), 1100); // вызвана (1000 мс истекли)
    setTimeout(() => f(5), 1500); // проигнорирована (менее 1000 мс с последнего вызова)

    this.clock.tick(5000);
    assert.equal(log, "14");
  });

  it("сохраняет контекст вызова", function() {
    let obj = {
      f() {
        assert.equal(this, obj);
      }
    };

    obj.f = debounce(obj.f, 1000);
    obj.f("test");
  });

});
