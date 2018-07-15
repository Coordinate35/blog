package main

import "github.com/gin-gonic/gin"

func main() {
	r := gin.New();
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "200",
			"msg": "",
			"data": []int{},
		})
	})
	r.Run()
}


