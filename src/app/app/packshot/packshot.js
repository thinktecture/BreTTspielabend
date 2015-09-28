(function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     * @public
     *
     * @param $scope
     * @param $element
     * @param $window
     * @param $stateParams
     * @param {GameApi} gameApi
     */
    function PackshotController($scope, $element, $window, $stateParams, gameApi) {
        var scene, camera, renderer, controls;

        init();

        function init() {
            var width = 500;
            var height = 500;

            // scene
            scene = new THREE.Scene();

            // camera
            camera = new THREE.PerspectiveCamera(45, width/height);
            camera.position.set(0, 0, 100);

            // renderer
            renderer = new THREE.WebGLRenderer({antialias: true});
            renderer.setPixelRatio($window.devicePixelRatio);
            renderer.setSize(width, height);
            renderer.setClearColor(0xffffff);

            var rendererElement = renderer.domElement;
            var container = $element.find('div')[0];
            container.appendChild(rendererElement);

            // controls
            controls = new THREE.TrackballControls(camera, rendererElement);

            // lights
            var ambientLight = new THREE.AmbientLight(0xcccccc);
            scene.add(ambientLight);

            var gameId = $stateParams.gameId;
            gameApi.get(gameId)
                .then(function (game) {
                    // box
                    var geometry = new THREE.CubeGeometry(50, 50, 10);
                    var material = new THREE.MeshLambertMaterial({color: 0xabcdef});
                    var box = new THREE.Mesh(geometry, material);
                    scene.add(box);
                });

            animate();
        }

        function animate() {
            controls.update();
            renderer.render(scene, camera);

            $window.requestAnimationFrame(animate);
        }
    }

    app.module.controller('packshotController', PackshotController);
})();
