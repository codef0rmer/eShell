App.directive('draggable', function() {
  "use strict";

  return {
    require: '?droppable',
    restrict: 'A',
    link: function(scope, element, attrs) {
      var updateDraggable = function() {
        if (scope.$eval(attrs.drag)) {
          element.draggable('destroy').draggable({
            axis: attrs.axis || false,
            revert: function (valid) {
              if (valid === false) {
                angular.element(this).css('visibility', 'visible');
              }
            },
            helper: 'clone',
            cursor: "move",
            zIndex: 9999,
            start: function () {
              angular.element(this).css('visibility', 'hidden');
              if (element.scope().$parent.onStart) {
                element.scope().$parent.onStart();
              }
            },
            stop: function () {
              angular.element('body').css('cursor', 'default');
              if (element.scope().$parent.onStop) {
                element.scope().$parent.onStop();
              }
            }
          });
        } else {
          element.draggable({disabled: true});
        }
      };

      scope.$watch(attrs.drag, updateDraggable);
      updateDraggable();
    }
  };
}).directive('droppable', function($timeout) {
  "use strict";

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var updateDroppable = function() {
        if (scope.$eval(attrs.drop)) {
          element.droppable('destroy').droppable({
            drop: function(event, ui) {
              if (scope.$eval(attrs.drop) && element.scope().$parent.onDrop) {
                $timeout(function() {
                  element.scope().$parent.onDrop(
                    $(ui.draggable).attr('data-list'),
                    $(ui.draggable).attr('data-index'),
                    attrs.list,
                    attrs.index
                  );
                  angular.element(ui.draggable).removeAttr('style');
                });
              }
            }
          });
        } else {
          element.droppable({disabled: true});
        }
      };

      scope.$watch(attrs.drop, updateDroppable);
      updateDroppable();
    }
  };
}).directive('angularHtmlBind', ['$compile', function($compile) {
  "use strict";

  return function(scope, elm, attrs) {
    scope.$watch(attrs.angularHtmlBind, function(newValue, oldValue) {
      if (newValue && newValue !== oldValue) {
        elm.html(newValue);
        $compile(elm.contents())(scope);
      }
    });
  };
}]).directive('jplayer', function() {
  "use strict";

  return {
    restrict: 'A',
    template: '<div></div>',
    link: function(scope, element, attrs) {
      var $control = element,
          $player = $control.children('div'),
          cls = 'pause';
      
      var updatePlayer = function() {
        $player.jPlayer('destroy').jPlayer({
          swfPath: 'scripts/vendor/jplayer/',
          supplied: 'mp3',
          solution: 'html, flash',
          preload: 'auto',
          wmode: 'window',
          ready: function () {
            $(this)
              .jPlayer("setMedia", {mp3: 'images/media/' + scope.$eval(attrs.audio)})
              .jPlayer(attrs.autoplay === 'true' ? 'play' : 'stop');
          },
          play: function() {
            $control.addClass(cls);

            if (attrs.pauseothers === 'true') {
              $(this).jPlayer('pauseOthers');
            }
          },
          pause: function() {
            $control.removeClass(cls);
          },
          stop: function() {
            
          },
          ended: function() {
            $control.removeClass(cls);
          }
        })
        .end()
        .unbind('click').click(function(e) {
          $player.jPlayer($control.hasClass(cls) ? 'stop' : 'play');
        });
      };

      scope.$watch(attrs.audio, updatePlayer);
      updatePlayer();
    }
  };
});