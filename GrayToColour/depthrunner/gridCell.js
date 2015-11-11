//Kinnear Justin Wong
//Nanyang Polytechnic

GridCell = function(leftX, rightX, topY, bottomY, debugRectangleColour)
{
    this.leftX = leftX
    this.rightX = rightX;
    this.topY = topY;
    this.bottomY = bottomY;
    
    this.debugRectangleColour = debugRectangleColour;
    
    this.centerX = ((rightX - leftX) / 2) + leftX;
    this.centerY = ((bottomY - topY) / 2) + topY;
    this.hasObject = false;
};