'use strict';
// Isolated controller checks: no browser, location request, account or network.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'js/pages/locations/lup-locations.js'), 'utf8');
const template = fs.readFileSync(path.join(root, 'js/pages/locations/lup-locations.html'), 'utf8');
function method(name, context) {
  const start = source.indexOf('$scope.' + name + ' = function');
  assert.ok(start >= 0, name);
  const end = source.indexOf('\n\t};', start) + 5;
  vm.runInNewContext(source.slice(start, end), context);
  return context.$scope[name];
}
(async () => {
  let scrolled, reduced = false;
  const scope = {data: {visibleRooms: [{id:1}, {id:2}], currentRoomIndex:0}, focusRoom(i) {this.data.currentRoomIndex=i;}};
  const context = {$scope:scope, window:{matchMedia:()=>({matches:reduced})}, scrollSelectedRoomIntoView:v=>scrolled=v};
  const step = method('discoveryStep', context);
  step(-1); assert.equal(scope.data.currentRoomIndex,0);
  step(1); assert.equal(scope.data.currentRoomIndex,1); assert.equal(scrolled,'smooth');
  step(1); assert.equal(scope.data.currentRoomIndex,1);
  reduced=true;step(-1);assert.equal(scrolled,'auto');
  scope.data.visibleRooms=[];step(1);assert.equal(scope.data.currentRoomIndex,0);
  scope.data.visibleRooms=[{},{}];
  const key = method('discoveryKey', context);const target={};let prevented=false;
  key({target:{},currentTarget:target,key:'ArrowRight',preventDefault(){throw Error('Nested control intercepted');}});
  assert.equal(scope.data.currentRoomIndex,0);
  key({target,currentTarget:target,key:'ArrowRight',preventDefault(){prevented=true;}});
  assert.ok(prevented);assert.equal(scope.data.currentRoomIndex,1);
  let joined=0;scope.gotoChat=()=>joined++;context.$timeout=fn=>fn();
  const enter=method('enterChatDoor',context);
  enter({inChatRange:()=>false});assert.equal(joined,0);
  enter({inChatRange:()=>true,id:()=>1});assert.equal(joined,1);
  scope.data.discoveryPositionPending=false;let probed=0;
  context.PositionSrvc={probe:()=>{probed++;return Promise.reject(Error('denied'));}};
  context.RoomSrvc={withRooms:()=>{throw Error('Rooms requested after denied GPS');}};
  const position=method('discoveryRequestPosition',context);
  await position();assert.equal(scope.data.discoveryPositionPending,false);assert.equal(scope.data.discoveryError,true);
  scope.data.discoveryPositionPending=true;position();assert.equal(probed,1);
  const capture=source.match(/rail.addEventListener\('click', (function\(event\) \{[\s\S]*?\n\t\t\}), true\)/)[1];
  let stopped=0;const handler=vm.runInNewContext('('+capture+')',{suppressRoomOpenUntil:200,Date:{now:()=>100}});
  handler({preventDefault(){stopped++;},stopImmediatePropagation(){stopped++;}});assert.equal(stopped,2);
  for(const lang of ['de','en']){
    const dict=JSON.parse(fs.readFileSync(path.join(root,'locale/locale-'+lang+'.json'),'utf8'));
    for(const key of template.match(/DISCOVERY_[A-Z_]+/g))assert.ok(dict[key],lang+': '+key);
  }
  assert.match(template,/ng-if="room.inChatRange\(\)" ng-click="enterChatDoor\(room\)"/);
  assert.match(template,/ng-if="!room.inChatRange\(\)" ng-click="maybeGotoRoom/);
  assert.match(template,/ng-if="!discoveryHasPosition\(\)"/);
  console.log('OK: card boundaries, keyboard, reduced motion, radius guard, denied GPS, duplicate request, swipe click suppression, DE/EN keys.');
})().catch(error=>{console.error(error);process.exitCode=1;});
