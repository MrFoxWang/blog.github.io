//初始化三维球
var viewer = new Cesium.Viewer('globe',{
      animation: false, //动画控制，默认true
      imageryProvider:new Cesium.ArcGisMapServerImageryProvider({ 
        url : "https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
        layers: '1,2,3,4,5,6,7,8,9',
        enablePickFeatures:true
        }),
      baseLayerPicker: false, //地图切换控件(底图以及地形图)是否显示,默认显示true
      fullscreenButton: true, //全屏按钮,默认显示true
      geocoder: false, //地名查找,默认true
      timeline: false, //时间线,默认true
      vrButton: false, //双屏模式,默认不显示false
      homeButton: false, //主页按钮，默认true
      infoBox: false, //点击要素之后显示的信息,默认true
      selectionIndicator: true, //选中元素显示,默认true
      sceneModePicker: false, //是否显示投影方式控件
      navigationHelpButton: false //是否显示帮助信息控件
})
//隐藏Logo
viewer._cesiumWidget._creditContainer.style.display = "none";
// 启用地球照明
viewer.scene.globe.enableLighting = false;
viewer.scene.globe.showGroundAtmosphere=false;

var longitude = 104.08048495000007;
var latitude = 30.646264488605972;
var height = 0;
var heading = 0;
var tileset = new Cesium.Cesium3DTileset({
    url: './data/tileset.json'
});
tileset.style = new Cesium.Cesium3DTileStyle({
  color: "color() *vec4(1,1,1,1)"
});
viewer.scene.primitives.add(tileset);
tileset.readyPromise.then(function(argument) {
    var position = Cesium.Cartesian3.fromDegrees(longitude, latitude, height);
    var mat = Cesium.Transforms.eastNorthUpToFixedFrame(position);
    var rotationX = Cesium.Matrix4.fromRotationTranslation(Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(heading)));
    Cesium.Matrix4.multiply(mat, rotationX, mat);
    tileset._root.transform = mat;
    viewer.camera.flyTo({destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, height + 1000)});
});

/* var promise= viewer.dataSources.add(Cesium.GeoJsonDataSource.load('./road/cd_roads.json', {   //json文件路径
  stroke: Cesium.Color.GREEN,  //多边形轮廓的默认颜色
  fill: Cesium.Color.GREEN,    //多边形内部的默认颜色。
  markerColor: Cesium.Color.RED, //获取或设置为每个点创建的地图针脚的默认颜色
  strokeWidth: 1,    //线段或者多边形默认宽度
  markerSymbol: 'name'   //是被标注字段
})); 
 */
/* var rectangle = new Cesium.Rectangle(Cesium.Math.toRadians(99.490814),Cesium.Math.toRadians(27.59903),
Cesium.Math.toRadians(111.61972),Cesium.Math.toRadians(36.739655));
var terrainLayer = new Cesium.CesiumTerrainProvider({
    url: './dataDem/layer.json',
    requestWaterMask:true,
    credit: 'http://www.bjxbsj.cn',
});
 viewer.terrainProvider = terrainLayer; 
viewer.scene.camera.flyTo({destination: rectangle});  */
